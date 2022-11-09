export interface IGenericRepository<T> {
  create(data: T): Promise<T>;
  update(id: string, data: T): Promise<T | null>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  delete(id: string): Promise<void>;
}
