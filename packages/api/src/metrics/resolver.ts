import { ApolloError } from 'apollo-server-express';
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { ContextType } from '../types';
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

  @Query((returns) => [Metric])
  allMetrics(@Ctx() { user }: ContextType): Promise<Metric[]> {
    return this.metricRepository.find({ user });
  }

  @Query((returns) => Metric)
  metricById(@Ctx() { user }: ContextType, @Arg('id') id: string) {
    return this.metricRepository.findOne({ id, user });
  }

  @Mutation((returns) => Metric)
  async createMetric(
    @Ctx() { user }: ContextType,
    @Arg('name') name: string,
    @Arg('type', { nullable: true }) type: MetricType | null
  ) {
    console.log('creating');
    const newMetric = new Metric();
    newMetric.name = name;
    newMetric.type = type || MetricType.DataPoint;
    newMetric.user = user;
    const result = await this.metricRepository.save(newMetric);

    console.log('Created Metric', result);
    return result;
  }

  @Mutation((returns) => Metric)
  async updateMetric(
    @Ctx() { user }: ContextType,
    @Arg('id') id: string,
    @Arg('metricInput') metricInput: MetricInput
  ) {
    const metric = await this.metricRepository.findOne({ id, user });
    if (!metric) {
      throw new ApolloError('Metric does not exist');
    }
    return this.metricRepository.save({ ...metric, ...metricInput });
  }

  @Mutation((returns) => Metric, { nullable: true })
  async deleteMetric(@Ctx() { user }: ContextType, @Arg('id') id: string) {
    const metric = await this.metricRepository.find({ id, user });
    this.metricRepository.remove(metric);
    return null;
  }
}
