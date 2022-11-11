import { IWeekData } from 'src/application/dto/IWeekData';

export interface IDataGenerator {
  getEmptyWeekData(weekDay: string): IWeekData;
}
