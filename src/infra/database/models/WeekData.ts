import { model, Schema } from 'mongoose';
import { IWeekData } from 'src/application/dto/IWeekData';

const WeekDataSchema = new Schema<IWeekData>();

export const WeekDataModel = model<IWeekData>(
  'WeekData',
  WeekDataSchema,
  'WeekData',
);
