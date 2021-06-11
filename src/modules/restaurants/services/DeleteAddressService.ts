import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import IAddressRepository from '../repositories/IAddressRepository';

interface IRequest {
  restaurant_id: string;
  address_id: string;
}

@injectable()
class DeleteAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute({ restaurant_id, address_id }: IRequest): Promise<void> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('Restaurant does not exist!');
    }

    const address = await this.addressRepository.findById(address_id);

    if (!address || address.restaurant_id !== restaurant_id) {
      throw new AppError('Address not found');
    }

    const deleted = await this.addressRepository.delete(address_id);

    if (!deleted.affected) {
      throw new AppError('Not deleted');
    }
  }
}

export default DeleteAddressService;
