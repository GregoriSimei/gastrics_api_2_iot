import 'reflect-metadata';
import './shared/environment/dotenv';
import express from 'express';
import { appConfig } from './config/appConfig';
import { errorHandler } from './infra/http/midlewares/errorHandler';
import { logger } from './shared/loggers/logger';
import './application/listeners/index';
import './infra/database/index';

const app = express();
app.use(errorHandler);

const port = appConfig.port;
app.listen(port, (): void => {
  logger.info(`App runing on port: ${port}`);
});
