import { model, Schema } from 'mongoose';
import { ICylinderAnalytics } from 'src/application/dto/ICylinderAnalytics';

const CylinderAnalitcsSchema = new Schema<ICylinderAnalytics>();

export const CylinderAnalitcsModel = model<ICylinderAnalytics>(
  'CylinderAnalytics',
  CylinderAnalitcsSchema,
  'CylinderAnalytics',
);
