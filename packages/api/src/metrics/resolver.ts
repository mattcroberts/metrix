import { Resolvers } from '../generated/graphql';
import { ContextType } from '../types';
import { Metric } from './Metric.model';
import { DataPoint } from '../datapoint/DataPoint.model';

export const MetricResolver: Resolvers<ContextType> = {
  DataPoint: {
    datetime: (parent) => {
      return new Date(parent.datetime).toISOString();
    },
  },
  Query: {
    allMetrics: (_, args, context) => {
      return context.connection.getRepository(Metric).find();
    },
    metricById: async (_, { id }, context) => {
      const result = await context.connection.getRepository(Metric).findOne({ id });
      return result;
    },
  },
  Mutation: {
    createMetric: async (_, { name }, context) => {
      console.log('creating');
      const newMetric = new Metric();
      newMetric.name = name;
      const result = await context.connection.getRepository(Metric).save(newMetric);

      console.log('Created Metric', result);
      return result;
    },
    recordMetric: async (_, { metricId }, { connection }) => {
      const metric = await connection.getRepository(Metric).findOne({ id: metricId });
      const dataPoint = new DataPoint();
      await connection.getRepository(DataPoint).save(dataPoint);
      metric.dataPoints.push(dataPoint);

      return connection.getRepository(Metric).save(metric);
    },
  },
};
