import { Owner } from '../../entities/owner';
import { IOwner } from '../../interface/owner/owner-interface';

export interface IOwnerRepository {
  create({ city, identity_document, name, state }: IOwner): Promise<Owner>;
  findAllCategories(): Promise<Owner[]>;
  findById(id: string): Promise<Owner>;
  updatePartial(id: string, ownerChanges: Partial<IOwner>): Promise<void>;
  updateFull(id: string, ownerChanges: IOwner): Promise<void>;
}
