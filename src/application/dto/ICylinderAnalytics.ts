import { IDayData } from './IDayData';
import { IWeekData } from './IWeekData';
import { weeksLong } from './WeeksLong';

export interface ICylinderAnalytics {
  _id?: string;
  exId: string;
  weeks: IWeekData[];
  daysData: IDayData[];
}
