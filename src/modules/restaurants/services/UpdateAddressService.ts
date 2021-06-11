import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import IAddressRepository from '../repositories/IAddressRepository';
import Address from '../infra/typeorm/entities/Address';

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
class UpdateAddressService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
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

    const restaurantAdress = await this.addressRepository.findByRestaurantId(
      restaurant_id,
    );

    if (!restaurantAdress || restaurantAdress.restaurant_id !== restaurant_id) {
      throw new AppError('Address does not exist!');
    }

    restaurantAdress.country = country;
    restaurantAdress.state = state;
    restaurantAdress.city = city;
    restaurantAdress.address = address;
    restaurantAdress.number = number;
    restaurantAdress.additional = additional;
    restaurantAdress.cep = cep;

    return this.addressRepository.save(restaurantAdress);
  }
}

export default UpdateAddressService;
