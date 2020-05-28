import * as Queue from 'bull';
import { resolve } from 'path';
import Container from 'typedi';
import { Connection } from 'typeorm';
import { Metric, ReminderUnit } from '../../metrics/Metric.model';
import { config } from '../../config';
import { Logger } from '../../logger';
import { DeviceRegistration } from '../DeviceRegistration.model';

export const notificationsQueue = new Queue('notifications', `redis://${config.redisHost}:6379`);

const generateCron = (unit: ReminderUnit, value: number, startingMinute: number, startingHour: number): string => {
  switch (unit) {
    case ReminderUnit.Day:
      return `${startingMinute} ${startingHour} */${value} * *`;
    case ReminderUnit.Hour:
      return `${startingMinute} */${value} * * *`;
    case ReminderUnit.Minute:
      return `*/${value} * * * *`;
  }
};

export const createMetricReminderJob = (
  metric: Metric,
  devices: DeviceRegistration[]
): { data: any; options: Queue.JobOptions } => {
  const cron = generateCron(metric.reminderUnit, metric.reminderValue, metric.reminderMinute, metric.reminderHour);
  return {
    data: {
      metric,
      tokens: devices.map((device) => device.token),
    },
    options: { jobId: `metric:${metric.id}`, repeat: { cron }, delay: 0 }, // BUG in bull setting jobid doesn't work for repeatable jobs
  };
};

// recreate all repeatable jobs (reminders)
export const initialiseJobs = async () => {
  const connection = Container.get<Connection>('connection');

  const metricRepo = connection.getRepository(Metric);
  const metrics = await metricRepo.find({ relations: ['user', 'user.devices'], where: { reminder: true } });

  await Promise.all(
    (await notificationsQueue.getRepeatableJobs()).map((job) => {
      return notificationsQueue.removeRepeatableByKey(job.key);
    })
  );

  const jobs = await Promise.all(
    metrics.map((metric) => {
      const { data, options } = createMetricReminderJob(metric, metric.user.devices);
      Logger.info({ data, options }, 'Adding job');
      return notificationsQueue.add(data, options);
    })
  );

  await metricRepo.save(
    jobs.map((job) => {
      return {
        ...job.data.metric,
        reminderJobId: job.id,
      };
    })
  );

  notificationsQueue.process(
    resolve(__dirname, './processor' + (process.env.NODE_ENV === 'production' ? '.js' : '.ts'))
  );
};
