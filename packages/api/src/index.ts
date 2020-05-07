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
import { createConnection } from 'typeorm';
import { AnalysisResolver } from './analysis/resolver';
import { config } from './config';
import { DataPointResolver } from './datapoint/resolver';
import { MetricResolver } from './metrics/resolver';
import { ContextType } from './types';
import { UserResolver } from './users/resolver';
import { User } from './users/User.model';
import { connectWithRetry } from './db';

TypeORM.useContainer(Container);
const PORT = config.port;
const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

app.get('/auth/google', passport.authenticate('google', {}));

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

app.use(cors());

connectWithRetry()
  .then(async (connection) => {
    console.log('DB connected');

    const userRepo = connection.getRepository(User);

    passport.use(
      new GoogleTokenStrategy(
        {
          clientID: config.googleAuth.clientId,
          clientSecret: config.googleAuth.clientSecret,
          scope: ['openid', 'profile', 'email'],
          callbackURL: '/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
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

    return new Promise((resolve) => {
      app.listen(PORT, () => {
        console.log(`API ready at http://localhost:${PORT}`);
        resolve();
      });
    });
  })
  .catch((error) => console.log(error));
