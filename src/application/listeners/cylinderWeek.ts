import { logger } from '../../shared/loggers/logger';
import { RabbitMQServer } from '../../infra/providers/messageComunication/app/HabbitMQServer';
import { DateManager } from '../../infra/providers/DateManager/DateManager';
import { IWeekDataRepository } from '../repository/IWeekDataRepository';
import { WeekDataRepository } from '../../infra/database/repository/WeekDataRepository';
import { IWeekData } from '../dto/IWeekData';
import { ICylinderData } from '../dto/ICylinderData';
import { DataGenerator } from '../../shared/DataGenerator/DataGenerator';
import { IDataGenerator } from '../../shared/DataGenerator/IDataGenerator';
import { ICalc } from '../../shared/Calc/ICalc';
import { Calc } from '../../shared/Calc/Calc';
import { IDataPerHour } from '../dto/DataPerHour';
import { IGastricsAppClient } from '../../infra/requests/gastrics_app/interface/IGastricsAppClient';
import { GastricsAppClient } from '../../infra/requests/gastrics_app/GastricsAppClient';

const dateManager = new DateManager();
const weekDataRepository: IWeekDataRepository = new WeekDataRepository();
const dataGenerator: IDataGenerator = new DataGenerator();
const calc: ICalc = new Calc();
const gastricsAppClient: IGastricsAppClient = new GastricsAppClient();

async function cylindersWeek() {
  const server = new RabbitMQServer();
  await server.start();
  await server.consume('iot.cylinder.week', async (message) => {
    const rabbitMessage = message.content.toString();
    logger.info(`Week ==> ${rabbitMessage}`);

    if (rabbitMessage) {
      const cylinderData: ICylinderData = JSON.parse(rabbitMessage);
      const { ex_id } = cylinderData;

      const dateNow = new Date();
      const weekDay = dateManager.getWeekDay(dateNow);

      const dataFound = await weekDataRepository.findByWeekDay(ex_id, weekDay);

      const weekDataToWork: IWeekData =
        dataFound || dataGenerator.getEmptyWeekData(weekDay);

      let newWeekData = calcGeneralInfo(weekDataToWork, cylinderData);
      newWeekData = calcHourInfo(
        weekDataToWork,
        cylinderData,
        weekDataToWork.weigthAVG,
      );

      // Precisa buscar os dados do cilindro para ver qual o peso do casco

      const cylinderFound = await gastricsAppClient.getCylinderByExId(ex_id);
      logger.info(cylinderFound);

      // Precisa remover o peso medio (ele não tem nenhuma função)
      // O trabalho maior vai estar no medidor de consumo
      // Medir consumo médio geral (colocar no lugar do peso médio)
      // Medir o consumo médio por hora
      // Medir o consumo total por hora

      // Ideia ==> Utilizar essa API para apenas gravar os dados e utilizar outra para fazer os calculos
    }
  });
}

function calcGeneralInfo(
  weekData: IWeekData,
  cylinderData: ICylinderData,
): IWeekData {
  const { iteration, weigthAVG } = weekData;
  const { weigth } = cylinderData;

  if (weigth < weigthAVG) {
    const newAvg = calc.getAvgByIteration(weigthAVG, weigth, iteration);
    weekData.weigthAVG = newAvg;
    weekData.iteration++;
  }

  return weekData;
}

function calcHourInfo(
  weekData: IWeekData,
  cylinderData: ICylinderData,
  oldWeigth: number,
): IWeekData {
  const { dataPerHours } = weekData;
  const { weigth } = cylinderData;

  const dateNow = new Date();
  const actualHour = dateManager.getHour(dateNow);

  const dataPerHour = dataPerHours?.find(
    (item: IDataPerHour) => item.hour == actualHour,
  );

  const dataPerHourToWork =
    dataPerHour || dataGenerator.getEmptyDataPerHour(actualHour);

  if (oldWeigth > 0) {
    const { consumption, consumptionAVG, consumptionIT } = dataPerHourToWork;
  }

  return weekData;
}

cylindersWeek();
