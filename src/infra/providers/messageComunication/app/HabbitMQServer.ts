import { Channel, connect, Connection, Message } from 'amqplib';
import { habbitMqConfig } from '../../../../config/habbitMqConfig';
import { ICommunicationServer } from '../DTO/IComunicationServer';

export class HabbitMQServer implements ICommunicationServer {
  private conn: Connection;
  private channel: Channel;

  async start(): Promise<void> {
    const { host, port, user, pass } = habbitMqConfig;

    const uri = `amqp://${user}:${pass}@${host}:${port}`;

    this.conn = await connect(uri);
    this.channel = await this.conn.createChannel();
  }

  async publishInQueue(queue: string, message: string): Promise<void> {
    this.channel.sendToQueue(queue, Buffer.from(message));
  }

  async publishInExchange(
    exchange: string,
    routingKey: string,
    message: string,
  ): Promise<boolean> {
    return await this.channel.publish(
      exchange,
      routingKey,
      Buffer.from(message),
    );
  }

  async consume(
    queue: string,
    callback: (message: Message) => void,
  ): Promise<any> {
    return this.channel.consume(queue, (message) => {
      callback(message);
      this.channel.ack(message);
    });
  }

  async getChannel(): Promise<Channel> {
    return this.channel;
  }
}
