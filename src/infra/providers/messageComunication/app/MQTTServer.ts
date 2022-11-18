import { Message } from 'amqplib';
import { IMQTTServer } from '../DTO/IMQTTServer';
import * as client from 'mqtt';
import { logger } from '../../../../shared/loggers/logger';
import { IClientOptions } from 'mqtt';

export class MQTTServer implements IMQTTServer {
  private client;

  async start(): Promise<void> {
    const options: IClientOptions = {
      host: 'broker.hivemq.com',
      port: 1883,
      protocol: 'tcp',
    };
    this.client = client.connect(options);
    this.client.on('connect', function () {
      logger.info('[MQTT] - Connected');
    });
    this.client.on('error', function (error) {
      logger.error(error);
    });
    this.client.subscribe('esp.test.balanca.tcc');
  }

  async publishInQueue(queue: string, message: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async publishInExchange(
    exchange: string,
    routingKey: string,
    message: string,
  ): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async consume(
    queue: string,
    callback: (message: Message) => void,
  ): Promise<any> {
    return this.client.on('message', (topic, message) => {
      if (queue == topic) {
        callback(message.toString());
      }
    });
  }
}
