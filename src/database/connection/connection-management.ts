import { DataSource } from 'typeorm';
import { IConnectionManagement } from './type';
import { configureConnection } from '../config';

class ConnectionManagement implements IConnectionManagement {
  public async connect(): Promise<DataSource> {
    return await configureConnection().initialize();
  }

  public async disconnect(connection: DataSource): Promise<void> {
    return await connection.destroy();
  }
}
export const connectionManagement = new ConnectionManagement();
