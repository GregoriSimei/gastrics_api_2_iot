import { IWeekData } from '../dto/IWeekData';
import { IGenericRepository } from './IGenericRepository';

export interface IWeekDataRepository extends IGenericRepository<IWeekData> {
  findByExId(exId: string): Promise<IWeekData>;
}
