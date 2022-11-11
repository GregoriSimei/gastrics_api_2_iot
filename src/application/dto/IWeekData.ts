import { IDataPerHour } from './DataPerHour';

export interface IWeekData {
  weekDay: string;
  weigthAVG: number;
  iteration: number;
  dataPerHours: IDataPerHour[];
}
