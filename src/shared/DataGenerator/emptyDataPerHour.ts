import { IDataPerHour } from 'src/application/dto/DataPerHour';

export function emptyDataPerHour(hour: string): IDataPerHour {
  return {
    hour,
    consumption: 0,
    consumptionAVG: 0,
    consumptionIT: 0,
    lastConsumption: 0,
    timeToEmpty: 0,
    updatedAt: new Date(),
    weigth: 0,
  };
}
