import { IDataPerHour } from 'src/application/dto/DataPerHour';
import { IWeekData } from 'src/application/dto/IWeekData';

export interface IDataGenerator {
  getEmptyWeekData(weekDay: string): IWeekData;
  getEmptyDataPerHour(hour: string): IDataPerHour;
}
