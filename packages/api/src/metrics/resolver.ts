import { Resolvers } from '../generated/graphql';
import { ContextType } from '../types';
import { Metric } from './Metric.model';

export const MetricResolver: Resolvers<ContextType> = {
  Query: {
    allMetrics: (_, parent, context) => {
      return context.connection.getRepository(Metric).find();
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
  },
};
