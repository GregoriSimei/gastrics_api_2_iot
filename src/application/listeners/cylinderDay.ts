import { logger } from '../../shared/loggers/logger';
import { RabbitMQServer } from '../../infra/providers/messageComunication/app/HabbitMQServer';
import { ICylinderData } from '../dto/ICylinderData';
import { IGastricsAppClient } from '../../infra/requests/gastrics_app/interface/IGastricsAppClient';
import { GastricsAppClient } from '../../infra/requests/gastrics_app/GastricsAppClient';
import { ICylinder } from 'src/infra/requests/gastrics_app/dto/ICylinder';
import { ICylinderAnalyticsRepository } from '../repository/ICylinderAnalyticsRepository';
import { CylinderAnalyticsRepository } from '../../infra/database/repository/CylinderAnalyticsRepository';
import { DataGenerator } from '../../shared/DataGenerator/DataGenerator';
import { IDataGenerator } from '../../shared/DataGenerator/IDataGenerator';
import { IDayDataRepository } from '../repository/IDayDataRepository';
import { DayDataRepository } from '../../infra/database/repository/dayDataRepository';
import { DateManager } from '../../infra/providers/DateManager/DateManager';
import { IDateManager } from '../../infra/providers/DateManager/IDateManager';
import { IDayData } from '../dto/IDayData';
import { Calc } from '../../shared/Calc/Calc';
import { ICalc } from '../../shared/Calc/ICalc';
import { MQTTServer } from '../../infra/providers/messageComunication/app/MQTTServer';

const gastricsAppClient: IGastricsAppClient = new GastricsAppClient();
const dateManager: IDateManager = new DateManager();
const dataGenerator: IDataGenerator = new DataGenerator();
const calc: ICalc = new Calc();
const dayDataRepository: IDayDataRepository = new DayDataRepository();
const cylinderAnalyticsRepository: ICylinderAnalyticsRepository =
  new CylinderAnalyticsRepository();

async function cylindersDay() {
  const server = new MQTTServer();
  await server.start();
  await server.consume('esp.test.balanca.tcc', async (message: any) => {
    const rabbitMessage = message;

    logger.info(`Day ==> ${message}`);

    if (rabbitMessage) {
      const cylinderData: ICylinderData = JSON.parse(rabbitMessage);
      cylinderData.weight -= 7.16;
      const { ex_id } = cylinderData;

      const cylinderFound: ICylinder =
        await gastricsAppClient.getCylinderByExId(ex_id);

      // If there is a cylinder with this ex_id, create the matrics
      if (cylinderFound) {
        // Create CylinderAnalysis case not exist
        const analyticsFound = await cylinderAnalyticsRepository.findByExId(
          ex_id,
        );
        if (!analyticsFound) {
          const newAnalytics =
            dataGenerator.getEmptyCylinderAnalytics(cylinderFound);

          await cylinderAnalyticsRepository.create(newAnalytics);
        }

        // Create Day Data if not exist
        const dateNow = new Date();
        const onlyDateString = dateManager.getOnlyDateInfo(dateNow);

        let dayDataToWork: IDayData = await dayDataRepository.findByDay(
          ex_id,
          onlyDateString,
        );
        if (!dayDataToWork) {
          const generatedData = dataGenerator.getEmptyDayData(onlyDateString);
          dayDataToWork = await dayDataRepository.createInAnalytics(
            ex_id,
            generatedData,
          );
        }

        // Generete diary metrics
        let {
          consumption,
          consumptionAVG,
          consumptionTot,
          cylinderWeight,
          hoursLeft,
          iteration,
          weight,
        } = dayDataToWork;

        const { updatedAt } = dayDataToWork;

        // Consumption Calc
        const iotWeight = cylinderData.weight;
        // Para calcular o consumo deve existir um peso anterior, para se medir a diferenca entre o peso atual e o antigo
        // Este peso nao pode ser negativo e nao pode ser maior do que um 1Kg e meio, pois eh sinal que o recipiente esta
        // Sendo trocado
        const consumptionTest =
          weight > 0 && weight - iotWeight > 0 && weight - iotWeight < 1.5;

        if (consumptionTest) {
          const newConsumption = weight - iotWeight;
          consumptionAVG = calc.getAvgByIteration(
            consumption,
            newConsumption,
            iteration,
          );
          consumption = newConsumption;
          consumptionTot += newConsumption;
        }

        // Update CylinderWeight
        cylinderWeight = cylinderFound.weightShell;

        // HoursLeft Calc
        const gasWeight = weight - cylinderWeight;

        const maxSecoundsToUpdate = 15;
        const runtime = dateManager.getSecoundsDiference(dateNow, updatedAt);

        if (runtime > 0 && runtime < maxSecoundsToUpdate) {
          const hoursLeftCalc = ((gasWeight / consumption) * runtime) / 360;
          hoursLeft = hoursLeftCalc > 0 ? hoursLeftCalc : 0;
        }

        // Update Weight
        weight = iotWeight;

        // Update Iteration num
        iteration++;

        const dataToUpdate: IDayData = {
          consumption,
          consumptionAVG,
          consumptionTot,
          cylinderWeight,
          hoursLeft,
          iteration,
          weight,
          date: onlyDateString,
          updatedAt: new Date(),
          weightAVG: 0,
        };

        dayDataRepository.update(ex_id, dataToUpdate);
      }
    }
  });
}

cylindersDay();
