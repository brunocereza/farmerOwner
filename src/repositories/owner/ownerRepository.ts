import { connectionManagement } from '../../database/connection/connectionManagement';
import { Owner } from '../../entities/owner';
import { IOwnerRepository } from './type';
import { IConnectionManagement } from '../../database/connection/type';
import { CreateOwner } from '../../interface/owner/ownerInterface';

class OwnerRepository implements IOwnerRepository {
  private connectionManagement: IConnectionManagement;
  constructor(connectionManagement: IConnectionManagement) {
    this.connectionManagement = connectionManagement;
  }

  public async create({
    city,
    identityDocument,
    name,
    state,
  }: CreateOwner): Promise<Owner> {
    //Cria conexão com o banco de dados - AJUSTAR PARA ALGUMA FORMA MELHOR
    const connection = await this.connectionManagement.connect();

    try {
      const owner = new Owner();
      owner.name = name;
      owner.identity_document = identityDocument;
      owner.city = city;
      owner.state = state;

      const owners = await connection.getRepository(Owner).save(owner);
      if (owners) return owners;
    } catch (error) {
      console.log(error);
    } finally {
      //Sempre após terminar o fluxo, encerra a conexão com o banco de dados
      await this.connectionManagement.disconnect(connection);
    }
  }

  public async findAllCategories(): Promise<Owner[]> {
    //Cria conexão com o banco de dados - AJUSTAR PARA ALGUMA FORMA MELHOR
    const connection = await this.connectionManagement.connect();

    try {
      const owners = await connection.getRepository(Owner).find();
      if (owners) return owners;
    } catch (error) {
      console.log(error);
    } finally {
      //Sempre após terminar o fluxo, encerra a conexão com o banco de dados
      await this.connectionManagement.disconnect(connection);
    }
  }
}

export const ownerRepository = new OwnerRepository(connectionManagement);
