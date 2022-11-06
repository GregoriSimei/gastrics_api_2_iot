import { logger } from '../../shared/loggers/logger';
import { RabbitMQServer } from '../../infra/providers/messageComunication/app/HabbitMQServer';

async function alertNotifications() {
  const server = new RabbitMQServer();
  await server.start();
  await server.consume('user.notification', (message) => {
    logger.info(`Notification ==> ${message.content.toString()}`);
  });
}

alertNotifications();
