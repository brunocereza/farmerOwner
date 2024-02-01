import { NotFoundError } from '../../core/errors/error';
import { Owner } from '../../entities/owner';
import { IOwner } from '../../interface/owner/owner-interface';
import { ownerRepository } from '../../repositories/owner/owner-repository';
import { IOwnerRepository } from '../../repositories/owner/type';
import { IOwnerController } from './type';

class OwnerController implements IOwnerController {
  private ownerRepository: IOwnerRepository;
  constructor(ownerRepository: IOwnerRepository) {
    this.ownerRepository = ownerRepository;
  }

  async create({
    city,
    identity_document,
    name,
    state,
  }: IOwner): Promise<Owner> {
    const ownerToCreate: IOwner = {
      city,
      identity_document,
      name,
      state,
    };

    const ownerAreCreated = await this.ownerRepository.create(ownerToCreate);

    return ownerAreCreated;
  }

  async getAll(): Promise<Owner[]> {
    const owners = await this.ownerRepository.findAllCategories();

    return owners;
  }

  async updatePartial(
    id: string,
    ownerChanges: Partial<IOwner>,
  ): Promise<void> {
    const owner = await this.ownerRepository.findById(id);

    if (!owner) {
      throw new NotFoundError('Owner Not Found');
    }
    const ownerToUpdate = this.updateUserDetails(owner, ownerChanges);

    await this.ownerRepository.updatePartial(id, ownerToUpdate);

    return;
  }

  async updateFull(id: string, ownerChanges: IOwner): Promise<void> {
    const owner = await this.ownerRepository.findById(id);

    if (!owner) {
      throw new NotFoundError('Owner Not Found');
    }

    await this.ownerRepository.updatePartial(id, ownerChanges);

    return;
  }

  private updateUserDetails(user: Owner, ownerChanges: Partial<Owner>): Owner {
    return { ...user, ...ownerChanges };
  }
}

export const ownerController = new OwnerController(ownerRepository);
