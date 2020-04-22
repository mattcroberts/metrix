import { ApolloError } from 'apollo-server-express';
import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { DataPoint } from '../datapoint/DataPoint.model';
import { Metric, MetricType } from './Metric.model';

@InputType()
class MetricInput {
  @Field()
  name: string;
}

@Resolver((of) => Metric)
export class MetricResolver {
  @InjectRepository(Metric)
  private metricRepository: Repository<Metric>;

  @InjectRepository(DataPoint)
  private dataPointRepository: Repository<DataPoint>;

  @Query((returns) => [Metric])
  allMetrics(): Promise<Metric[]> {
    return this.metricRepository.find();
  }

  @Query((returns) => Metric)
  metricById(@Arg('id') id: string) {
    return this.metricRepository.findOne({ id });
  }

  @Mutation((returns) => Metric)
  async createMetric(@Arg('name') name: string, @Arg('type', { nullable: true }) type: MetricType | null) {
    console.log('creating');
    const newMetric = new Metric();
    newMetric.name = name;
    newMetric.type = type || MetricType.DataPoint;
    const result = await this.metricRepository.save(newMetric);

    console.log('Created Metric', result);
    return result;
  }

  @Mutation((returns) => Metric)
  async updateMetric(@Arg('id') id: string, @Arg('metricInput') metricInput: MetricInput) {
    const metric = await this.metricRepository.findOne({ id });
    if (!metric) {
      throw new ApolloError('Metric does not exist');
    }
    return this.metricRepository.save({ ...metric, ...metricInput });
  }

  @Mutation((returns) => Metric, { nullable: true })
  async deleteMetric(@Arg('id') id: string) {
    const metric = await this.metricRepository.find({ id });
    this.metricRepository.remove(metric);
    return null;
  }
}
