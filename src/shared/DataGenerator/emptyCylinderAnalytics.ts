import { ICylinderAnalytics } from 'src/application/dto/ICylinderAnalytics';
import { ICylinder } from 'src/infra/requests/gastrics_app/dto/ICylinder';

export function emptyCylinderAnalytics(
  cylinder: ICylinder,
): ICylinderAnalytics {
  return {
    exId: cylinder.exId,
    daysData: [],
    weeks: [],
  };
}
