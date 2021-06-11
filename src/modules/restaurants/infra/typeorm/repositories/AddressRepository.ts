import { DeleteResult, getRepository, Repository } from 'typeorm';

import IAddressRepository from '@modules/restaurants/repositories/IAddressRepository';
import ICreateAddressDTO from '@modules/restaurants/dtos/ICreateAddressDTO';
import Address from '../entities/Address';

class AddressRepository implements IAddressRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async create(data: ICreateAddressDTO): Promise<Address> {
    const address = this.ormRepository.create(data);

    await this.ormRepository.save(address);

    return address;
  }

  public async findByRestaurantId(
    restaurant_id: string,
  ): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({ restaurant_id });

    return address;
  }

  public async findById(id: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({
      where: { id },
    });

    return address;
  }

  public async findByNumber(number: number): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({
      where: { number },
    });

    return address;
  }

  public async save(address: Address): Promise<Address> {
    return this.ormRepository.save(address);
  }

  public async delete(address_id: string): Promise<DeleteResult> {
    const result = await this.ormRepository.delete({ id: address_id });

    return result;
  }
}

export default AddressRepository;
