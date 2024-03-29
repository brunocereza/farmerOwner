import { Owner } from '../../entities/owner/owner-entity';
import { IOwner } from '../../interface/owner/owner-interface';

export interface IOwnerController {
  create({ city, identity_document, name, state }: IOwner): Promise<Owner>;
  getAll(): Promise<Owner[]>;
  getById(id: string): Promise<Owner>;
  updatePartial(id: string, changes: Partial<IOwner>): Promise<void>;
  updateFull(id: string, ownerChanges: IOwner): Promise<void>;
  delete(id: string): Promise<void>;
}
