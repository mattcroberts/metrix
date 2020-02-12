import { ApolloServer } from 'apollo-server';
import { Prisma } from './generated/prisma-client';

const prisma = new Prisma();
const resolvers = {
  User: () => prisma.users(),
};

const typeDefs = `

input UserInput {
  id: ID
}
type Query {
  user(input: UserInput): User
}

type User {
  id: ID
}`;

const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
