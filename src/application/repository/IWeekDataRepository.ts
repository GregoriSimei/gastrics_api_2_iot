import { IWeekData } from '../dto/IWeekData';
import { IGenericRepository } from './IGenericRepository';

export interface IWeekDataRepository extends IGenericRepository<IWeekData> {
  findByWeekDay(exId: string, weekDay: string): Promise<IWeekData>;
}
