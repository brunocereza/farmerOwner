import { Owner } from '../../entities/owner';
import { CreateOwner } from '../../interface/owner/ownerInterface';

export interface IOwnerController {
  create({
    city,
    identityDocument,
    name,
    state,
  }: CreateOwner): Promise<boolean>;
  getAll(): Promise<Owner[]>;
}
