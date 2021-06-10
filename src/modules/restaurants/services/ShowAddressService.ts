import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Address from '../infra/typeorm/entities/Address';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';
import IAddressRepository from '../repositories/IAddressRepository';

@injectable()
class ShowAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute(restaurant_id: string): Promise<Address> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('Restaurant does not exists!');
    }

    const address = await this.addressRepository.findByRestaurantId(
      restaurant_id,
    );

    if (!address) {
      throw new AppError('Address does not exists!');
    }

    return address;
  }
}

export default ShowAddressService;
