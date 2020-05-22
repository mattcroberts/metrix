import { ApolloError } from 'apollo-server-express';
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { createMetricReminderJob, notificationsQueue } from '../push-notifications/scheduler';
import { ContextType } from '../types';
import { Metric, MetricType, ReminderUnit } from './Metric.model';

@InputType()
class MetricInput {
  @Field()
  name: string;

  @Field()
  reminder: boolean;

  @Field(() => ReminderUnit, { nullable: true })
  reminderUnit: ReminderUnit;

  @Field({ nullable: true })
  reminderValue: number;
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
    const metric = await this.metricRepository.findOne({ where: { id, user }, relations: ['user', 'user.devices'] });
    if (!metric) {
      throw new ApolloError('Metric does not exist');
    }

    let reminderJobId = metric.reminderJobId;
    if (metricInput.reminder !== metric.reminder && metricInput.reminder === false) {
      await this.removeReminder(metric.reminderJobId);
      reminderJobId = null;
    }

    if (metricInput.reminderUnit !== metric.reminderUnit || metricInput.reminderValue !== metric.reminderValue) {
      await this.removeReminder(metric.reminderJobId);
      const { data, options } = createMetricReminderJob({ ...metric, ...metricInput });
      reminderJobId = '' + (await (await notificationsQueue.add(data, options)).id);
    }
    
    return this.metricRepository.save({ ...metric, ...metricInput, reminderJobId });
  }

  @Mutation((returns) => Metric, { nullable: true })
  async deleteMetric(@Ctx() { user }: ContextType, @Arg('id') id: string) {
    const metric = await this.metricRepository.find({ id, user });
    this.metricRepository.remove(metric);
    return null;
  }

  async removeReminder(jobId: string) {
    const job = await notificationsQueue.getJob(jobId);

    if (job) {
      await job.remove();
    }
  }
}
