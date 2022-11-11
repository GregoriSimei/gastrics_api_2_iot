import { ICalc } from './ICalc';

export class Calc implements ICalc {
  getAvgByIteration(oldAvg: number, newNum: number, iteration: number) {
    return (oldAvg * iteration + newNum) / (iteration + 1);
  }
}
