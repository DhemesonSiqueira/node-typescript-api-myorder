import { inject, injectable } from 'tsyringe';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import AppError from '@shared/errors/AppError';
import Address from '../infra/typeorm/entities/Address';
import IAddressRepository from '../repositories/IAddressRepository';

interface IRequest {
  restaurant_id: string;
  country: string;
  state: string;
  city: string;
  address: string;
  number: number;
  additional: string;
  cep: string;
}

@injectable()
class CreateAdressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute({
    restaurant_id,
    country,
    state,
    city,
    address,
    number,
    additional,
    cep,
  }: IRequest): Promise<Address> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('You do not have permission!');
    }

    const addressRestaurant = await this.addressRepository.create({
      restaurant_id,
      country,
      state,
      city,
      address,
      number,
      additional,
      cep,
    });

    return addressRestaurant;
  }
}

export default CreateAdressService;
