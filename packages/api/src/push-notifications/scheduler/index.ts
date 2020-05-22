import * as Queue from 'bull';
import { resolve } from 'path';
import Container from 'typedi';
import { Connection } from 'typeorm';
import { Metric, ReminderUnit } from '../../metrics/Metric.model';
import { config } from '../../config';

export const notificationsQueue = new Queue('notifications', `redis://${config.redisHost}:6379`);

const generateCron = (unit: ReminderUnit, value: number): string => {
  switch (unit) {
    case ReminderUnit.Day:
      return `0 0 */${value} * *`;
    case ReminderUnit.Hour:
      return `0 */${value} * * *`;
    case ReminderUnit.Minute:
      return `*/${value} * * * *`;
  }
};

export const initialiseJobs = async () => {
  const connection = Container.get<Connection>('connection');

  const metricRepo = connection.getRepository(Metric);
  const metrics = await metricRepo.find({ relations: ['user', 'user.devices'], where: { reminder: true } });

  await Promise.all(
    metrics.map((metric) => {
      const cron = generateCron(metric.reminderUnit, metric.reminderValue);

      return notificationsQueue.add(
        {
          metric,
          tokens: metric.user.devices.map((device) => device.token),
        },
        { jobId: `metric:${metric.id}`, repeat: { cron }, delay: 0 }
      );
    })
  );

  notificationsQueue.process(resolve(__dirname, './processor.ts'));
};
