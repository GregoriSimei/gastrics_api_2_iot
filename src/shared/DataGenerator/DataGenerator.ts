import { emptyCylinderAnalytics } from './emptyCylinderAnalytics';
import { emptyDataPerHour } from './emptyDataPerHour';
import { emptyDayData } from './emptyDayData';
import { emptyWeekData } from './EmptyWeekData';
import { IDataGenerator } from './IDataGenerator';

export class DataGenerator implements IDataGenerator {
  getEmptyWeekData = emptyWeekData;
  getEmptyDataPerHour = emptyDataPerHour;
  getEmptyCylinderAnalytics = emptyCylinderAnalytics;
  getEmptyDayData = emptyDayData;
}
