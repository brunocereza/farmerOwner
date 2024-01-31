import { Owner } from '../../entities/owner';
import { CreateOwner } from '../../interface/owner/ownerInterface';
import { ownerRepository } from '../../repositories/owner/ownerRepository';
import { IOwnerRepository } from '../../repositories/owner/type';
import { IOwnerController } from './type';
class OwnerController implements IOwnerController {
  private ownerRepository: IOwnerRepository;
  constructor(ownerRepository: IOwnerRepository) {
    this.ownerRepository = ownerRepository;
  }

  async create({
    city,
    identityDocument,
    name,
    state,
  }: CreateOwner): Promise<boolean> {
    const ownerToCreate: CreateOwner = {
      city,
      identityDocument,
      name,
      state,
    };

    const ownerAreCreated = await this.ownerRepository.create(ownerToCreate);

    return true;
  }

  async getAll(): Promise<Owner[]> {
    const owners = await this.ownerRepository.findAllCategories();

    return owners;
  }
}
export const ownerController = new OwnerController(ownerRepository);
