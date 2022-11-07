import * as mongoose from 'mongoose';
import { mongodbConfig } from '../../config/mongodbConfig';
import { logger } from '../../shared/loggers/logger';

const { host, pass, port, user } = mongodbConfig;

const connectionString = `mongodb://${user}:${pass}@${host}:${port}`;

logger.info(`Connection string ${connectionString}`);

const dbConnection = mongoose
  .connect(connectionString)
  .then(() => {
    logger.info('[MONGOOSE] - connected');
  })
  .catch((err) => {
    logger.info('[MONGOOSE] - error -', err);
  });

export default dbConnection;
