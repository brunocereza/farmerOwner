import { ErrorTreatment, NotFoundError } from '../../core/errors/error';
import { connectionManagement } from '../../database/connection/connection-management';
import { IConnectionManagement } from '../../database/connection/type';
import { Farm } from '../../entities/farm/farm-entity';
import { IFarm } from '../../interface/farm/farm-interface';
import { IFarmRepository } from './type';

class FarmRepository implements IFarmRepository {
  private connectionManagement: IConnectionManagement;
  constructor(connectionManagement: IConnectionManagement) {
    this.connectionManagement = connectionManagement;
  }

  public async create({
    ownerId,
    name,
    city,
    state,
    arable_area,
    total_area,
    crops_types,
    vegetation_area,
  }: IFarm): Promise<Farm> {
    const connection = await this.connectionManagement.connect();

    try {
      const farm = new Farm();
      farm.name = name;
      farm.city = city;
      farm.state = state;
      farm.arable_area = arable_area;
      farm.total_area = total_area;
      farm.crops_types = crops_types;
      farm.vegetation_area = vegetation_area;
      farm.ownerId = ownerId;

      const farmSaved = await connection.getRepository(Farm).save(farm);

      return farmSaved;
    } catch (error) {
      throw new ErrorTreatment(error);
    } finally {
      await this.connectionManagement.disconnect(connection);
    }
  }
  public async getAll(): Promise<Farm[]> {
    const connection = await this.connectionManagement.connect();

    try {
      const farms = await connection.getRepository(Farm).find();
      if (farms) return farms;
      return;
    } catch (error) {
      throw new ErrorTreatment(error);
    } finally {
      await this.connectionManagement.disconnect(connection);
    }
  }

  public async findById(id: string): Promise<Farm> {
    const connection = await this.connectionManagement.connect();

    try {
      const [farm] = await connection.getRepository(Farm).findBy({ id });
      if (farm) return farm;
    } catch (error) {
      throw new ErrorTreatment(error);
    } finally {
      await this.connectionManagement.disconnect(connection);
    }
  }
  public async updatePartial(
    id: string,
    farmChanges: Partial<IFarm>,
  ): Promise<void> {
    const connection = await this.connectionManagement.connect();

    try {
      await connection.getRepository(Farm).update({ id: id }, farmChanges);
      return;
    } catch (error) {
      throw new ErrorTreatment(error);
    } finally {
      await this.connectionManagement.disconnect(connection);
    }
  }
  public async updateFull(id: string, farmChanges: IFarm): Promise<void> {
    const connection = await this.connectionManagement.connect();

    try {
      await connection.getRepository(Farm).update({ id: id }, farmChanges);
      return;
    } catch (error) {
      throw new ErrorTreatment(error);
    } finally {
      await this.connectionManagement.disconnect(connection);
    }
  }

  public async getByOwnerId(id: string): Promise<Farm[]> {
    const connection = await this.connectionManagement.connect();
    try {
      const form = await connection.getRepository(Farm).find({
        where: {
          ownerId: id,
        },
        relations: {
          owner: true,
        },
      });

      return form;
    } catch (error) {
      throw new ErrorTreatment(error);
    } finally {
      await this.connectionManagement.disconnect(connection);
    }
  }

  public async delete(id: string): Promise<boolean> {
    const connection = await this.connectionManagement.connect();

    try {
      const { affected } = await connection.getRepository(Farm).delete(id);

      return !!affected;
    } catch (error) {
      throw new ErrorTreatment(error);
    } finally {
      await this.connectionManagement.disconnect(connection);
    }
  }
}

export const farmRepository = new FarmRepository(connectionManagement);
