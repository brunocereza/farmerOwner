import { Farm } from '../../entities/farm/farm-entity';
import { IFarm } from '../../interface/farm/farm-interface';

export interface IFarmController {
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
  getById(id: string): Promise<Farm>;
  updatePartial(id: string, changes: Partial<IFarm>): Promise<void>;
  // updateFull(id: string, ownerChanges: IOwner): Promise<void>;
}
