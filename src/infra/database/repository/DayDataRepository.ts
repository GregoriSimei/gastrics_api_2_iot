import { IDayData } from 'src/application/dto/IDayData';
import { IDayDataRepository } from 'src/application/repository/IDayDataRepository';
import { CylinderAnalitcsModel } from '../models/CylinderAnalytics';

export class DayDataRepository implements IDayDataRepository {
  async createInAnalytics(exId: string, data: IDayData): Promise<IDayData> {
    await CylinderAnalitcsModel.updateOne(
      { exId },
      {
        $push: {
          daysData: data,
        },
      },
    );
    const dayDataCreated = await this.findByDay(exId, data.date);
    return dayDataCreated;
  }

  async findByDay(exId: string, day: string): Promise<IDayData> {
    const cylinderDataFound = await CylinderAnalitcsModel.findOne({
      exId,
      'daysData.date': day,
    });

    const dayDataFound =
      cylinderDataFound?.daysData?.find((dayData) => dayData.date == day) ||
      null;

    return dayDataFound;
  }

  async update(exId: string, data: IDayData): Promise<IDayData> {
    data.updatedAt = new Date();

    await CylinderAnalitcsModel.updateOne(
      { 'daysData.date': data.date },
      {
        $set: {
          'daysData.$': data,
        },
      },
    );

    const updatedWeekData = await this.findByDay(exId, data.date);

    return updatedWeekData;
  }

  create(data: IDayData): Promise<IDayData> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<IDayData[]> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<IDayData> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
