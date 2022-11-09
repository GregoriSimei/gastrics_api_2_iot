import { IDataPerHour } from './DataPerHour';
import { weeksLong } from './WeeksLong';

export interface IWeekData {
  exId: string;
  name: keyof weeksLong;
  weigthAVG: number;
  iteration: number;
  dataPerHours: IDataPerHour[];
}
