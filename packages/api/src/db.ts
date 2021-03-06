import { getConnectionOptions, Connection, createConnection } from 'typeorm';
import { Logger } from './logger';

export const connectWithRetry = async (retries = 5, timeout = 500): Promise<Connection> => {
  const connectionOptions: any = Object.assign(await getConnectionOptions(), {
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
  });

  try {
    const connection = await createConnection(connectionOptions);
    return connection;
  } catch (e) {
    Logger.error(e);

    if (retries > 0) {
      setTimeout(() => {
        Logger.warn(`Retrying connection, retrys remaining: ${retries}, timeout: ${timeout}`);
        return connectWithRetry(retries - 1, timeout);
      }, timeout);
    } else {
      Logger.error(new Error(`DB connection failed with retrys`));
      throw new Error('DB Fail');
    }
  }
};
