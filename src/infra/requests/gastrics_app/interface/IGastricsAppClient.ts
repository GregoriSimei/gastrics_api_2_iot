import { ICylinder } from '../dto/ICylinder';

export interface IGastricsAppClient {
  getCylinderByExId(exId: string): Promise<ICylinder | null>;
}
