import { logger } from '../../shared/loggers/logger';
import { RabbitMQServer } from '../providers/messageComunication/app/HabbitMQServer';

async function cylindersYear() {
  const server = new RabbitMQServer();
  await server.start();
  await server.consume('iot.cylinder.year', (message) => {
    logger.info(`Year ==> ${message.content.toString()}`);
  });
}

cylindersYear();
