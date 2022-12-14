import { Message } from 'amqplib';

export interface IMQTTServer {
  start(): Promise<void>;
  publishInQueue(queue: string, message: string): Promise<void>;
  publishInExchange(
    exchange: string,
    routingKey: string,
    message: string,
  ): Promise<boolean>;
  consume(queue: string, callback: (message: Message) => void): Promise<any>;
}
