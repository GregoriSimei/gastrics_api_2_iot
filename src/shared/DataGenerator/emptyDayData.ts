import { IDayData } from 'src/application/dto/IDayData';

export function emptyDayData(date: string): IDayData {
  return {
    date,
    consumption: 0,
    consumptionAVG: 0,
    consumptionTot: 0,
    cylinderWeight: 0,
    hoursLeft: 0,
    iteration: 0,
    updatedAt: new Date(),
    weight: 0,
    weightAVG: 0,
  };
}
