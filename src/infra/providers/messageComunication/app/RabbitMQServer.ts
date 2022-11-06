import { Channel, Message } from 'amqplib';
import { IRabbitMQServer } from '../DTO/IRabbitServer';
import { injectable, inject } from 'tsyringe';
import { IRabbitMQConnection } from '../DTO/IRabbitMQConnction';

@injectable()
export class RabbitMQServer implements IRabbitMQServer {
  constructor(
    @inject('IRabbitMQConnection')
    private rabbitMQConnection: IRabbitMQConnection,
  ) {}

  private channel = async (): Promise<Channel> => {
    await this.rabbitMQConnection.start();
    const channel = await this.rabbitMQConnection.getChannel();
    return channel;
  };

  async publishInQueue(queue: string, message: string): Promise<void> {
    await this.rabbitMQConnection.start();

    (await this.channel()).sendToQueue(queue, Buffer.from(message));
  }

  async publishInExchange(
    exchange: string,
    routingKey: string,
    message: string,
  ): Promise<boolean> {
    return await (
      await this.channel()
    ).publish(exchange, routingKey, Buffer.from(message));
  }

  async consume(
    queue: string,
    callback: (message: Message) => void,
  ): Promise<any> {
    return (await this.channel()).consume(queue, async (message) => {
      callback(message);
      (await this.channel()).ack(message);
    });
  }

  async getChannel(): Promise<Channel> {
    return await this.channel();
  }
}
