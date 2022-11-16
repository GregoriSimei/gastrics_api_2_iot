import { ICylinderAnalytics } from '../dto/ICylinderAnalytics';
import { IGenericRepository } from './IGenericRepository';

export interface ICylinderAnalyticsRepository
  extends IGenericRepository<ICylinderAnalytics> {
  findByExId(exId: string): Promise<ICylinderAnalytics>;
}
