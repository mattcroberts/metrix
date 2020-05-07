import { getConnectionOptions, Connection, createConnection } from 'typeorm';

export const connectWithRetry = async (retries = 5, timeout = 500): Promise<Connection> => {
  const connectionOptions: any = Object.assign(
    await getConnectionOptions(),
    {
      host: process.env.TYPEORM_HOST,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
    },
    process.env.NODE_ENV === 'production'
      ? {
          entities: [process.env.TYPEORM_ENTITIES_DIR],
          subscribers: [process.env.TYPEORM_SUBSCRIBERS_DIR],
          migrations: [process.env.TYPEORM_MIGRATIONS_DIR],
        }
      : {}
  );

  try {
    const connection = await createConnection(connectionOptions);
    console.log('DB Connected');
    return connection;
  } catch (e) {
    console.error(e);

    if (retries > 0) {
      setTimeout(() => {
        console.warn(`Retrying connection, retrys remaining: ${retries}, timeout: ${timeout}`);
        return connectWithRetry(retries - 1, timeout);
      }, timeout);
    } else {
      console.error(new Error(`DB connection failed with retrys`));
      throw new Error('DB Fail');
    }
  }
};
