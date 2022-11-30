import { IAlert } from '../dto/IAlert';
import { ICompany } from '../dto/ICompany';
import { ICylinder } from '../dto/ICylinder';

export interface IGastricsAppClient {
  getCylinderByExId(exId: string): Promise<ICylinder | null>;
  postAlert(companyId: string, alert: IAlert): Promise<IAlert | null>;
  getAlertsFromCompany(companyId: string): Promise<IAlert[]>;
  findCompanyByExId(exId: string): Promise<ICompany | null>;
}
