import { Owner } from '../../entities/owner';
import { CreateOwner } from '../../interface/owner/ownerInterface';

export interface IOwnerRepository {
  create({ city, identityDocument, name, state }: CreateOwner): Promise<Owner>;
  findAllCategories(): Promise<Owner[]>;
}
