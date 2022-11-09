import { IDataPerHour } from './DataPerHour';
import { weeksLong } from './WeeksLong';

export interface IWeekData {
  name: keyof weeksLong;
  weigthAVG: number;
  iteration: number;
  dataPerHours: IDataPerHour[];
}
