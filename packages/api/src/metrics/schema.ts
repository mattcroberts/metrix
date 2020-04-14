import { gql } from 'apollo-server';

export const MetricSchema = gql`
  type Metric {
    id: ID!
    name: String!
  }

  extend type Query {
    allMetrics: [Metric]!
  }

  extend type Mutation {
    createMetric(name: String!): Metric!
  }
`;
