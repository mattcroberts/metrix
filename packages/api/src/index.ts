import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { sign, verify } from 'jsonwebtoken';
import * as passport from 'passport';
import { Strategy as GoogleTokenStrategy } from 'passport-google-oauth20';
import { ExtractJwt } from 'passport-jwt';
import 'reflect-metadata';
import * as TypeGraphQL from 'type-graphql';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';
import { AnalysisResolver } from './analysis/resolver';
import { config } from './config';
import { DataPointResolver } from './datapoint/resolver';
import { connectWithRetry } from './db';
import { MetricResolver } from './metrics/resolver';
import * as pushNotifications from './push-notifications';
import { ContextType } from './types';
import { UserResolver } from './users/resolver';
import { User } from './users/User.model';
import { initialiseJobs } from './push-notifications/scheduler';
import * as cookieParser from 'cookie-parser';

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection');
  console.error(reason);
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

app.use(pushNotifications.router);

connectWithRetry()
  .then(async (connection) => {
    console.log('DB connected');
    Container.set('connection', connection);

    const userRepo = connection.getRepository(User);

    const schema = await TypeGraphQL.buildSchema({
      resolvers: [MetricResolver, AnalysisResolver, DataPointResolver, UserResolver],
      container: Container,
      emitSchemaFile: true,
    });

    const apolloServer = new ApolloServer({
      schema,
      context: async ({ req, res }): Promise<ContextType> => {
        try {
          const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
          const jwt = verify(token, config.jwtSecret);

          if (typeof jwt === 'object') {
            const userId = jwt['id'];

            const user = await userRepo.findOne(userId);
            return { connection, user };
          }
        } catch (e) {
          console.error(e);
        }

        throw new AuthenticationError('Error');
      },
      formatError: (err) => {
        console.error(err);

        return err;
      },
    });

    apolloServer.applyMiddleware({ app });
    const firebaseApp = pushNotifications.initialise();
    initialiseJobs();
    return new Promise((resolve) => {
      app.listen(PORT, () => {
        console.log(`API ready at http://localhost:${PORT}`);

        resolve();
      });
    });
  })
  .catch((error) => console.log(error));
