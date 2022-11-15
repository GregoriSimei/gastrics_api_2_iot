import { IWeekData } from 'src/application/dto/IWeekData';
import { IWeekDataRepository } from 'src/application/repository/IWeekDataRepository';
import { CylinderAnalitcsModel } from '../models/CylinderAnalytics';

export class WeekDataRepository implements IWeekDataRepository {
  async create(data: IWeekData): Promise<IWeekData> {
    throw new Error('Method not implemented');
  }

  async createInAnalytics(exId: string, data: IWeekData): Promise<IWeekData> {
    await CylinderAnalitcsModel.updateOne(
      { exId },
      {
        $push: {
          weeks: data,
        },
      },
    );
    const weekFound = await this.findByWeekDay(exId, data.weekDay);
    return weekFound;
  }

  async update(exId: string, data: IWeekData): Promise<IWeekData> {
    await CylinderAnalitcsModel.updateOne(
      { 'weeks.weekDay': data.weekDay },
      {
        $set: {
          'weeks.$': data,
        },
      },
    );
    const updatedWeekData = await this.findByWeekDay(exId, data.weekDay);
    return updatedWeekData;
  }

  async findAll(): Promise<IWeekData[]> {
    throw new Error('Method not implemented');
  }

  async findById(id: string): Promise<IWeekData> {
    throw new Error('Method not implemented');
  }

  async findByWeekDay(exId: string, weekDay: string): Promise<IWeekData> {
    const cylinderAnalytics = await CylinderAnalitcsModel.find({
      exId,
      'weeks.weekDay': weekDay,
    });
    const weekDataFound = cylinderAnalytics[0]?.weeks?.find(
      (weekData: IWeekData) => weekData.weekDay == weekDay,
    );

    return weekDataFound ? weekDataFound[0] : null;
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
