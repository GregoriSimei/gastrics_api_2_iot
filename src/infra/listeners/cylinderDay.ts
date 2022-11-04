import { logger } from '../../shared/loggers/logger';
import { RabbitMQServer } from '../providers/messageComunication/app/HabbitMQServer';

async function cylindersDay() {
  const server = new RabbitMQServer();
  await server.start();
  await server.consume('iot.cylinder.day', (message) => {
    logger.info(`Day ==> ${message.content.toString()}`);
  });
}

cylindersDay();
