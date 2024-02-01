import { Owner } from '../../entities/owner';
import { IOwner } from '../../interface/owner/owner-interface';

export interface IOwnerController {
  create({ city, identity_document, name, state }: IOwner): Promise<Owner>;
  getAll(): Promise<Owner[]>;
  updatePartial(id: string, changes: Partial<IOwner>): Promise<void>;
  updateFull(id: string, ownerChanges: IOwner): Promise<void>;
}
