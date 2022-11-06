import * as mongoose from 'mongoose';
import { mongodbConfig } from 'src/config/mongodbConfig';
import { logger } from 'src/shared/loggers/logger';

const { host, pass, port, user, dbname } = mongodbConfig;

const connectionString = `mongodb://${user}:${pass}@${host}:${port}/${dbname}?retryWrites=true&w=majority`;

const db = mongoose.connect(connectionString);

mongoose.connection.on('connected', () => {
  logger.info('[MONGOOSE] - connected');
});
mongoose.connection.on('error', (err) => {
  logger.info('[MONGOOSE] - error -', err);
});
mongoose.connection.on('disconnected', (err) => {
  logger.info('[MONGOOSE] - diconnect', err);
});

export default db;
