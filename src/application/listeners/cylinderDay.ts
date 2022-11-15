import { logger } from '../../shared/loggers/logger';
import { RabbitMQServer } from '../../infra/providers/messageComunication/app/HabbitMQServer';

const dateManager = new DateManager();
const weekDataRepository: IWeekDataRepository = new WeekDataRepository();
const dataGenerator: IDataGenerator = new DataGenerator();
const calc: ICalc = new Calc();
const gastricsAppClient: IGastricsAppClient = new GastricsAppClient();

async function cylindersDay() {
  const server = new RabbitMQServer();
  await server.start();
  await server.consume('iot.cylinder.day', (message) => {
    logger.info(`Day ==> ${message.content.toString()}`);
  });
}

cylindersDay();
