import { DataSource } from 'typeorm';

export interface IConnectionManagement {
  connect(): Promise<DataSource>;
  disconnect(config: DataSource): Promise<void>;
}
