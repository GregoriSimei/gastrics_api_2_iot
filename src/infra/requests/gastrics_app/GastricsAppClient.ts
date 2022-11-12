import { gastrixApiAdapter } from '../../../infra/adapters/GastricsApiAdapter';
import { ICylinder } from './dto/ICylinder';
import { IGastricsAppClient } from './interface/IGastricsAppClient';

export class GastricsAppClient implements IGastricsAppClient {
  async getCylinderByExId(exId: string): Promise<ICylinder | null> {
    const params = { exId };
    const response = await gastrixApiAdapter.get('/cylinder', { params });
    const cylinderFound: ICylinder | null = response.data;
    return cylinderFound;
  }
}
