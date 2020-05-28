import { ApolloError } from 'apollo-server-express';
import { IsInt, Length, Max, Min } from 'class-validator';
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Logger } from '../logger';
import { DeviceRegistration } from '../push-notifications/DeviceRegistration.model';
import { createMetricReminderJob, notificationsQueue } from '../push-notifications/scheduler';
import { ContextType } from '../types';
import { Metric, MetricType, ReminderUnit } from './Metric.model';

@InputType()
class MetricInput {
  @Field()
  @Length(3, 20)
  name: string;

  @Field()
  reminder: boolean;

  @Field(() => ReminderUnit, { nullable: true })
  reminderUnit: ReminderUnit;

  @Field({ nullable: true })
  @Min(1)
  @IsInt()
  reminderValue: number;

  @Field({ nullable: true })
  @Min(0)
  @Max(59)
  @IsInt()
  reminderMinute: number;

  @Field({ nullable: true })
  @Min(0)
  @Max(23)
  @IsInt()
  reminderHour: number;
}

@Resolver((of) => Metric)
export class MetricResolver {
  @InjectRepository(Metric)
  private metricRepository: Repository<Metric>;

  @InjectRepository(DeviceRegistration)
  private deviceRepository: Repository<DeviceRegistration>;

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
    @Arg('metricInput') metricInput: MetricInput,
    @Arg('type', { nullable: true }) type: MetricType | null
  ) {
    Logger.info('Creating metric');
    let reminderJobId = null;
    const metric = new Metric();

    Object.assign(metric, { type: type || MetricType.DataPoint, user, ...metricInput });
    if (metric.reminder) {
      const devices = await this.deviceRepository.find({ user });
      const { data, options } = createMetricReminderJob(metric, devices);
      reminderJobId = '' + (await (await notificationsQueue.add(data, options)).id);
      Logger.info({ data, options, reminderJobId }, 'Created notifcation job');
    }

    const result = await this.metricRepository.save({ ...metric, reminderJobId });

    Logger.info(result, 'Created Metric');
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
    const reminderHour = metricInput.reminderHour === null ? metric.reminderHour : metricInput.reminderHour;
    const reminderMinute = metricInput.reminderMinute === null ? metric.reminderMinute : metricInput.reminderMinute;

    let reminderJobId = metric.reminderJobId;
    if (metricInput.reminder !== metric.reminder && metricInput.reminder === false) {
      await this.removeReminder(metric.reminderJobId);
      reminderJobId = null;
    }

    if (metricInput.reminderUnit !== metric.reminderUnit || metricInput.reminderValue !== metric.reminderValue) {
      await this.removeReminder(metric.reminderJobId);

      if (metricInput.reminder) {
        const { data, options } = createMetricReminderJob(
          { ...metric, ...metricInput, reminderHour, reminderMinute },
          metric.user.devices
        );
        reminderJobId = '' + (await (await notificationsQueue.add(data, options)).id);
      } else {
        reminderJobId = '';
      }
    }

    return this.metricRepository.save({
      ...metric,
      ...metricInput,
      reminderJobId,
      reminderHour,
      reminderMinute,
    });
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
