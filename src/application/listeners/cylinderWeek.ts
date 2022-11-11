import { logger } from '../../shared/loggers/logger';
import { RabbitMQServer } from '../../infra/providers/messageComunication/app/HabbitMQServer';
import { DateManager } from '../../infra/providers/DateManager/DateManager';
import { IWeekDataRepository } from '../repository/IWeekDataRepository';
import { WeekDataRepository } from '../../infra/database/repository/WeekDataRepository';
import { IWeekData } from '../dto/IWeekData';
import { ICylinderData } from '../dto/ICylinderData';
import { DataGenerator } from '../../shared/DataGenerator/DataGenerator';
import { IDataGenerator } from '../../shared/DataGenerator/IDataGenerator';

const dateManager = new DateManager();
const weekDataRepository: IWeekDataRepository = new WeekDataRepository();
const dataGenerator: IDataGenerator = new DataGenerator();

async function cylindersWeek() {
  const server = new RabbitMQServer();
  await server.start();
  await server.consume('iot.cylinder.week', async (message) => {
    const rabbitMessage = message.content.toString();
    logger.info(`Week ==> ${rabbitMessage}`);

    if (rabbitMessage) {
      const cylinderData: ICylinderData = JSON.parse(rabbitMessage);

      const dateNow = new Date();
      const weekDay = dateManager.getWeekDay(dateNow);

      const hour = dateManager.getHour(dateNow);

      const dataFound = await weekDataRepository.findByWeekDay(
        cylinderData.ex_id,
        weekDay,
      );
      const dataExist = Boolean(dataFound);

      const weekDataToWork: IWeekData = dataExist
        ? dataFound
        : dataGenerator.getEmptyWeekData(weekDay);
    }
  });
}

cylindersWeek();
