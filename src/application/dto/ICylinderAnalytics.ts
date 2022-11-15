import { IDayData } from './IDayData';
import { IWeekData } from './IWeekData';
import { weeksLong } from './WeeksLong';

export interface ICylinderAnalytics {
  exId: string;
  name: keyof weeksLong;
  weeks: IWeekData[];
  daysData: IDayData[];
}
