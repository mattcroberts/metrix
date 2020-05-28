import { ApolloServer } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import { sign } from 'jsonwebtoken';
import * as passport from 'passport';
import { Strategy as GoogleTokenStrategy } from 'passport-google-oauth20';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import 'reflect-metadata';
import * as TypeGraphQL from 'type-graphql';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';
import { AnalysisResolver } from './analysis/resolver';
import { config } from './config';
import { DataPointResolver } from './datapoint/resolver';
import { connectWithRetry } from './db';
import { Logger } from './logger';
import { MetricResolver } from './metrics/resolver';
import * as pushNotifications from './push-notifications';
import { DeviceRegistrationResolver } from './push-notifications/resolver';
import { initialiseJobs } from './push-notifications/scheduler';
import { ContextType } from './types';
import { UserResolver } from './users/resolver';
import { User } from './users/User.model';

process.on('unhandledRejection', (reason) => {
  Logger.error('Unhandled Rejection');
  Logger.error(reason);
});

TypeORM.useContainer(Container);
const PORT = config.port;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(passport.initialize());

app.get('/auth/google', passport.authenticate('google'));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    session: false,
  }),
  function (req, res) {
    const user: any = req.user;

    res.cookie(
      config.tokenCookieName,
      sign(
        {
          id: user.id,
          email: user.email,
        },
        config.jwtSecret
      )
    );
    res.redirect(config.uiHost);
  }
);

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: config.googleAuth.clientId,
      clientSecret: config.googleAuth.clientSecret,
      scope: ['openid', 'profile', 'email'],
      callbackURL: `${config.apiPath}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      const connection = Container.get<TypeORM.Connection>('connection');
      const userRepo = connection.getRepository(User);
      const email = profile.emails[0].value;

      const user = await userRepo.findOne({ email });

      if (user) {
        done(null, user);
      } else {
        const newUser = new User();
        newUser.firstName = profile.name.givenName;
        newUser.lastName = profile.name.familyName;
        newUser.email = email;
        await userRepo.save(newUser);
        done(null, newUser);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    { secretOrKey: config.jwtSecret, jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() },
    (jwt, done) => {
      const connection = Container.get<TypeORM.Connection>('connection');
      const userRepo = connection.getRepository(User);

      userRepo
        .findOneOrFail({ id: jwt.id })
        .then((user) => done(null, user))
        .catch((err) => done(err));
    }
  )
);

app.use('/graphql', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  next();
});

connectWithRetry()
  .then(async (connection) => {
    Logger.info('DB connected');
    Container.set('connection', connection);

    const userRepo = connection.getRepository(User);

    const schema = await TypeGraphQL.buildSchema({
      resolvers: [MetricResolver, AnalysisResolver, DataPointResolver, UserResolver, DeviceRegistrationResolver],
      container: Container,
      emitSchemaFile: true,
    });

    const apolloServer = new ApolloServer({
      schema,
      context: async ({ req, res }): Promise<ContextType> => {
        return { user: req.user };
      },
      formatError: (err) => {
        Logger.error(err);

        return err;
      },
    });

    apolloServer.applyMiddleware({ app });
    const firebaseApp = pushNotifications.initialise();
    initialiseJobs();
    return new Promise((resolve) => {
      app.listen(PORT, () => {
        Logger.info(`API ready at http://localhost:${PORT}`);

        resolve();
      });
    });
  })
  .catch((error) => Logger.info(error));
