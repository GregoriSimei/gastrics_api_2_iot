import { gastrixApiAdapter } from '../../../infra/adapters/GastricsApiAdapter';
import { IAlert } from './dto/IAlert';
import { ICompany } from './dto/ICompany';
import { ICylinder } from './dto/ICylinder';
import { IGastricsAppClient } from './interface/IGastricsAppClient';

export class GastricsAppClient implements IGastricsAppClient {
  async getCylinderByExId(exId: string): Promise<ICylinder | null> {
    const params = { exId };
    const response = await gastrixApiAdapter.get('/iot/cylinder', { params });
    const cylinderFound: ICylinder | null = response.data;
    return cylinderFound;
  }

  async postAlert(companyId: string, alert: IAlert): Promise<IAlert | null> {
    let result: IAlert | null = null;

    await gastrixApiAdapter
      .post(`/company/${companyId}/alert`, alert)
      .then((resp) => {
        result = resp.data;
      })
      .catch(() => {
        result = null;
      });

    return result;
  }

  async getAlertsFromCompany(companyId: string): Promise<IAlert[]> {
    let result: IAlert[] = [];

    await gastrixApiAdapter
      .get(`/company/${companyId}/alert`)
      .then((resp) => {
        result = resp.data;
      })
      .catch(() => {
        result = [];
      });

    return result;
  }

  async findCompanyByExId(exId: string): Promise<ICompany | null> {
    const params = { exId };
    const response = await gastrixApiAdapter.get('/iot/company/cylinder', {
      params,
    });
    const companyFound: ICompany | null = response.data;
    return companyFound;
  }
}
