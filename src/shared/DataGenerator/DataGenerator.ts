import { emptyWeekData } from './EmptyWeekData';
import { IDataGenerator } from './IDataGenerator';

export class DataGenerator implements IDataGenerator {
  getEmptyWeekData = emptyWeekData;
}
