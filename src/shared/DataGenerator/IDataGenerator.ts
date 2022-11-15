import { IDataPerHour } from 'src/application/dto/DataPerHour';
import { ICylinderAnalytics } from 'src/application/dto/ICylinderAnalytics';
import { IWeekData } from 'src/application/dto/IWeekData';
import { ICylinder } from 'src/infra/requests/gastrics_app/dto/ICylinder';

export interface IDataGenerator {
  getEmptyWeekData(weekDay: string): IWeekData;
  getEmptyDataPerHour(hour: string): IDataPerHour;
  getEmptyCylinderAnalytics(cylinder: ICylinder): ICylinderAnalytics;
}
