import { connectionManagement } from '../../database/connection/connection-management';
import { Owner } from '../../entities/owner/owner-entity';
import { IOwnerRepository } from './type';
import { IConnectionManagement } from '../../database/connection/type';
import { IOwner } from '../../interface/owner/owner-interface';
import { ErrorTreatment } from '../../core/errors/error';

class OwnerRepository implements IOwnerRepository {
  private connectionManagement: IConnectionManagement;
  constructor(connectionManagement: IConnectionManagement) {
    this.connectionManagement = connectionManagement;
  }

  public async create({
    city,
    identity_document,
    name,
    state,
  }: IOwner): Promise<Owner> {
    const connection = await this.connectionManagement.connect();

    try {
      const owner = new Owner();
      owner.name = name;
      owner.identity_document = identity_document.replace(/[^\d]+/g, '');
      owner.city = city;
      owner.state = state;

      const owners = await connection.getRepository(Owner).save(owner);
      if (owners) return owners;
      return;
    } catch (error) {
      throw new ErrorTreatment(error);
    } finally {
      await this.connectionManagement.disconnect(connection);
    }
  }

  public async getAll(): Promise<Owner[]> {
    const connection = await this.connectionManagement.connect();

    try {
      const owners = await connection.getRepository(Owner).find();
      if (owners) return owners;
      return;
    } catch (error) {
      throw new ErrorTreatment(error);
    } finally {
      await this.connectionManagement.disconnect(connection);
    }
  }

  public async findById(id: string): Promise<Owner> {
    const connection = await this.connectionManagement.connect();

    try {
      const [owner] = await connection.getRepository(Owner).findBy({ id });
      if (owner) return owner;
      return owner;
    } catch (error) {
      throw new ErrorTreatment(error);
    } finally {
      await this.connectionManagement.disconnect(connection);
    }
  }

  public async updatePartial(
    id: string,
    ownerChanges: Partial<IOwner>,
  ): Promise<void> {
    const connection = await this.connectionManagement.connect();

    try {
      await connection.getRepository(Owner).update({ id: id }, ownerChanges);
      return;
    } catch (error) {
      throw new ErrorTreatment(error);
    } finally {
      await this.connectionManagement.disconnect(connection);
    }
  }

  public async updateFull(id: string, ownerChanges: IOwner): Promise<void> {
    const connection = await this.connectionManagement.connect();

    try {
      await connection.getRepository(Owner).update({ id: id }, ownerChanges);
      return;
    } catch (error) {
      throw new ErrorTreatment(error);
    } finally {
      await this.connectionManagement.disconnect(connection);
    }
  }
}

export const ownerRepository = new OwnerRepository(connectionManagement);
