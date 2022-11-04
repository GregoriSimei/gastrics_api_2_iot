import { logger } from '../../shared/loggers/logger';
import { RabbitMQServer } from '../providers/messageComunication/app/HabbitMQServer';

async function cylindersMonth() {
  const server = new RabbitMQServer();
  await server.start();
  await server.consume('iot.cylinder.month', (message) => {
    logger.info(`Month ==> ${message.content.toString()}`);
  });
}

cylindersMonth();
