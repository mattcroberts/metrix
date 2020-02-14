import { ApolloServer } from 'apollo-server';
import { Prisma } from './generated/prisma-client';

const prisma = new Prisma();
const resolvers = {
  User: () => prisma.users(),
  // Metric: () => prisma.metric(),
  Query: {
    allMetrics: async () => {
      const metrics = await prisma.metrics();

      return metrics.map(async metric => {
        const dataPoints = await prisma.dataPoints({
          where: {
            metric: { id: metric.id },
          },
        });
        console.log(dataPoints);
        return {
          ...metric,
          dataPoints: dataPoints,
        };
      });
    },
  },
  Mutation: {
    createMetric: (_, { input }) => {
      return prisma.createMetric({ name: input.name });
    },
    createDataPoint: async (_, { input }) => {
      console.log(input);
      return prisma.createDataPoint({
        dateTime: new Date(),
        metric: {
          connect: {
            id: input.metricId,
          },
        },
      });
    },
  },
};

const typeDefs = `

input MetricInput {
  name: String!
}

input CreateDataPointInput {
  metricId: String!
}

type Query {
  user: User
  allMetrics: [Metric]
}

type Mutation {
  createMetric(input: MetricInput): Metric!
  createDataPoint(input: CreateDataPointInput ): DataPoint!
}

type User {
  id: ID
}

type DataPoint {
  id: ID
  dateTime: String
}

type Metric {
  id: ID
  name: String!
  dataPoints: [DataPoint]
}`;

const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
