import 'reflect-metadata';
import './shared/environment/dotenv';
import express from 'express';
import { appConfig } from './config/appConfig';
import { errorHandler } from './infra/http/midlewares/errorHandler';
import { logger } from './shared/loggers/logger';
import './application/listeners/index';
import './infra/database/index';
import cors from 'cors';

const app = express();
app.use(errorHandler);
app.use(cors());

const port = appConfig.port;
app.listen(port, (): void => {
  logger.info(`App runing on port: ${port}`);
});
