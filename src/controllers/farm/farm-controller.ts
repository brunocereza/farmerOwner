import { NotFoundError } from '../../core/errors/error';
import { Farm } from '../../entities/farm/farm-entity';
import { IFarm } from '../../interface/farm/farm-interface';
import { farmRepository } from '../../repositories/farm/farm-repository';
import { IFarmRepository } from '../../repositories/farm/type';
import { IFarmController } from './type';

class FarmController implements IFarmController {
  private farmRepository: IFarmRepository;
  constructor(farmRepository: IFarmRepository) {
    this.farmRepository = farmRepository;
  }

  async create({
    ownerId,
    name,
    city,
    state,
    arable_area,
    total_area,
    crops_types,
    vegetation_area,
  }: IFarm): Promise<Farm> {
    const farmToCreate: IFarm = {
      ownerId,
      name,
      city,
      state,
      arable_area,
      total_area,
      crops_types,
      vegetation_area,
    };

    const farmAreCreated = await this.farmRepository.create(farmToCreate);

    if (farmAreCreated) return farmAreCreated;
  }

  async getAll(): Promise<Farm[]> {
    const farms = await this.farmRepository.getAll();

    if (!farms.length) {
      throw new NotFoundError('Farm Not Found!');
    }
    return farms;
  }

  async updatePartial(id: string, farmChanges: Partial<IFarm>): Promise<void> {
    const farm = await this.farmRepository.findById(id);

    if (!farm) {
      throw new NotFoundError('Farm Not Found!');
    }
    const farmToUpdate = this.updateFarmDetails(farm, farmChanges);

    await this.farmRepository.updatePartial(id, farmToUpdate);

    return;
  }

  async updateFull(id: string, farmChanges: IFarm): Promise<void> {
    const farm = await this.farmRepository.findById(id);

    if (!farm) {
      throw new NotFoundError('Farm Not Found!');
    }

    await this.farmRepository.updateFull(id, farmChanges);

    return;
  }
  async getById(id: string): Promise<Farm> {
    const farm = await this.farmRepository.findById(id);

    if (!farm) {
      throw new NotFoundError('Farm Not Found!');
    }
    return farm;
  }

  async getByOwnerId(id: string): Promise<Farm[]> {
    const farm = await this.farmRepository.getByOwnerId(id);

    if (!farm.length) {
      throw new NotFoundError('Farm Not Found!');
    }
    return farm;
  }

  private updateFarmDetails(
    Farm: Farm,
    FarmChanges: Partial<Farm>,
  ): Partial<Farm> {
    return { ...Farm, ...FarmChanges };
  }
}

export const farmController = new FarmController(farmRepository);
