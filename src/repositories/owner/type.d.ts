import { Owner } from '../../entities/owner/owner-entity';
import { IOwner } from '../../interface/owner/owner-interface';

export interface IOwnerRepository {
  create({ city, identity_document, name, state }: IOwner): Promise<Owner>;
  getAll(): Promise<Owner[]>;
  findById(id: string): Promise<Owner>;
  updatePartial(id: string, ownerChanges: Partial<IOwner>): Promise<void>;
  updateFull(id: string, ownerChanges: IOwner): Promise<void>;
  delete(id: string): Promise<boolean>;
}
