import { ApolloServer, gql } from 'apollo-server-express';
import * as express from 'express';
import 'reflect-metadata';
import * as TypeGraphQL from 'type-graphql';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';
import { createConnection } from 'typeorm';
import { MetricResolver } from './metrics/resolver';
import { ContextType } from './types';

TypeORM.useContainer(Container);
const PORT = process.env.PORT || 4000;
const app = express();

createConnection()
  .then(async (connection) => {
    console.log('DB connected');

    const schema = await TypeGraphQL.buildSchema({
      resolvers: [MetricResolver],
      container: Container,
      emitSchemaFile: true,
    });

    const apolloServer = new ApolloServer({
      schema,
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
