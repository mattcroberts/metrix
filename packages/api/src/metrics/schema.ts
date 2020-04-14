import { gql } from 'apollo-server';

export const MetricSchema = gql`
  type DataPoint {
    id: ID!
    datetime: String!
  }

  type Metric {
    id: ID!
    name: String!
    dataPoints: [DataPoint]!
  }

  extend type Query {
    allMetrics: [Metric]!
    metricById(id: String!): Metric
  }

  extend type Mutation {
    createMetric(name: String!): Metric!
    recordMetric(metricId: String!): Metric
  }
`;
