import { IDayData } from '../dto/IDayData';
import { IGenericRepository } from './IGenericRepository';

export interface IDayDataRepository extends IGenericRepository<IDayData> {
  findByDay(exId: string, day: string): Promise<IDayData>;
  createInAnalytics(exId: string, data: IDayData): Promise<IDayData>;
}
