import { IWeekData } from 'src/application/dto/IWeekData';
import { IWeekDataRepository } from 'src/application/repository/IWeekDataRepository';
import { WeekDataModel } from '../models/WeekData';

export class WeekDataRepository implements IWeekDataRepository {
  async create(data: IWeekData): Promise<IWeekData> {
    const createdWeekData = await WeekDataModel.create(data);
    return createdWeekData;
  }

  async update(id: string, data: IWeekData): Promise<IWeekData> {
    await WeekDataModel.updateOne({ id }, data);
    const updatedWeekData = await WeekDataModel.findById(id);
    return updatedWeekData;
  }

  async findAll(): Promise<IWeekData[]> {
    const allWeekData = await WeekDataModel.find({});
    return allWeekData;
  }

  async findById(id: string): Promise<IWeekData> {
    const weekDataFound = await WeekDataModel.findById(id);
    return weekDataFound;
  }

  async findByExId(exId: string): Promise<IWeekData> {
    const weekDataFound = await WeekDataModel.find({ exId });
    return weekDataFound ? weekDataFound[0] : null;
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
