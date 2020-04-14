import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-express';
import * as express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { UserSchema } from './users/schema';
import { UserResolver } from './users/resolver';
import { MetricSchema } from './metrics/schema';
import { ContextType } from './types';
import { MetricResolver } from './metrics/resolver';

const PORT = process.env.PORT || 4000;
const app = express();

const RootSchema = gql`
  type Query

  type Mutation
`;

createConnection()
  .then(async (connection) => {
    console.log('DB connected');

    const apolloServer = new ApolloServer({
      schema: makeExecutableSchema({
        typeDefs: [RootSchema, UserSchema, MetricSchema],
        resolvers: [MetricResolver, UserResolver],
      }),
      context: (): ContextType => {
        return { connection };
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
