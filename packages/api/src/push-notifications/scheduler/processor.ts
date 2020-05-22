import { Job } from 'bull';
import { messaging } from 'firebase-admin';
import { initialise } from '..';
import { config } from '../../config';
import { Metric } from '../../metrics/Metric.model';

initialise();

export default async (job: Job<{ tokens: string[]; metric: Metric }>) => {
  job.log(`Processing job ${job.queue?.name}:${job.id}`);

  const mess = messaging();

  try {
    await mess.sendMulticast({
      notification: {
        title: 'Your metric needs updating',
        body: job.data.metric.name,
      },
      webpush: {
        fcmOptions: {
          link: `${config.uiHost}/metric/${job.data.metric.id}`,
        },
      },
      tokens: job.data.tokens,
    });
  } catch (e) {
    console.error(e);
  }
};
