import { IWeekData } from 'src/application/dto/IWeekData';

export function emptyWeekData(weekDay: string): IWeekData {
  return {
    weekDay,
    dataPerHours: [],
    iteration: 0,
    weigthAVG: 0,
  };
}
