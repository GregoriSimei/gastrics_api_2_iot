import { Channel, Connection } from 'amqplib';

export interface IRabbitMQConnection {
  start(): Promise<void>;
  getConnection(): Promise<Connection>;
  getChannel(): Promise<Channel>;
}
