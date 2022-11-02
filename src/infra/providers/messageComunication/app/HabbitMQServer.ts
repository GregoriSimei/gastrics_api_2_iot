import { Channel, connect, Connection, Message } from 'amqplib';
import { ICommunicationServer } from '../DTO/IComunicationServer';

export class HabbitMQServer implements ICommunicationServer {
  private conn: Connection;
  private chanel: Channel;

  constructor(private uri: string) {}

  async start(): Promise<void> {
    this.conn = await connect(this.uri);
    this.chanel = await this.conn.createChannel();
  }

  async publishInQueue(queue: string, message: string): Promise<void> {
    this.chanel.sendToQueue(queue, Buffer.from(message));
  }

  async publishInExchange(
    exchange: string,
    routingKey: string,
    message: string,
  ): Promise<boolean> {
    return await this.chanel.publish(
      exchange,
      routingKey,
      Buffer.from(message),
    );
  }

  async consume(
    queue: string,
    callback: (message: Message) => void,
  ): Promise<any> {
    return this.chanel.consume(queue, (message) => {
      callback(message);
      this.chanel.ack(message);
    });
  }
}
