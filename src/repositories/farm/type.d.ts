import { Farm } from '../../entities/farm/farm-entity';
import { IFarm } from '../../interface/farm/farm-interface';

export interface IFarmRepository {
  create({
    ownerId,
    name,
    city,
    state,
    arable_area,
    total_area,
    crops_types,
    vegetation_area,
  }: IFarm): Promise<Farm>;

  getAll(): Promise<Farm[]>;
  findById(id: string): Promise<Farm>;
  updatePartial(id: string, ownerChanges: Partial<IFarm>): Promise<void>;
  updateFull(id: string, ownerChanges: IFarm): Promise<void>;
  getByOwnerId(id: string): Promise<Farm[]>;
}
