import { logger } from '../../shared/loggers/logger';
import { RabbitMQServer } from '../../infra/providers/messageComunication/app/HabbitMQServer';

async function cylindersWeek() {
  const server = new RabbitMQServer();
  await server.start();
  await server.consume('iot.cylinder.week', (message) => {
    logger.info(`Week ==> ${message.content.toString()}`);
  });
}

cylindersWeek();
