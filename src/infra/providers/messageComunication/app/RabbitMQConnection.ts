import { Connection, connect, Channel } from 'amqplib';
import { habbitMqConfig } from '../../../../config/habbitMqConfig';
import { logger } from '../../../../shared/loggers/logger';
import { IRabbitMQConnection } from '../DTO/IRabbitMQConnction';
import { injectable } from 'tsyringe';

@injectable()
export class RabbitMQConnection implements IRabbitMQConnection {
  private conn: Connection;
  private channel: Channel;

  async start(): Promise<void> {
    if (!this.conn || !this.channel) {
      const { host, port, user, pass } = habbitMqConfig;

      const uri = `amqp://${user}:${pass}@${host}:${port}`;

      logger.info(`HabbitMQ URI : ${uri}`);

      this.conn = await connect(uri);

      this.channel = await this.conn.createChannel();
    }
  }

  async getConnection(): Promise<Connection> {
    return this.conn;
  }

  async getChannel(): Promise<Channel> {
    return this.channel;
  }
}
