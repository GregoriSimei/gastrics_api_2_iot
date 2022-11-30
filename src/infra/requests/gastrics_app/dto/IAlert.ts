export interface IAlert {
  id?: string;
  name: string;
  type: string;
  status: string;
  dayDescription?: string;
  cylinderExId: string;
  updated_at?: Date;
  created_at?: Date;
}
