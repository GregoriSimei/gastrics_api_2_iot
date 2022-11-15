import { ICylinderAnalytics } from 'src/application/dto/ICylinderAnalytics';
import { ICylinderAnalyticsRepository } from 'src/application/repository/ICylinderAnalyticsRepository';
import { CylinderAnalitcsModel } from '../models/CylinderAnalytics';

export class CylinderAnalyticsRepository
  implements ICylinderAnalyticsRepository
{
  async create(data: ICylinderAnalytics): Promise<ICylinderAnalytics> {
    return await CylinderAnalitcsModel.create(data);
  }

  async update(
    id: string,
    data: ICylinderAnalytics,
  ): Promise<ICylinderAnalytics> {
    await CylinderAnalitcsModel.updateOne({ _id: id }, data);
    return this.findById(id);
  }

  async findAll(): Promise<ICylinderAnalytics[]> {
    return await CylinderAnalitcsModel.find({});
  }

  async findById(id: string): Promise<ICylinderAnalytics> {
    return await CylinderAnalitcsModel.findOne({ _id: id });
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
