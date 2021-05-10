import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import Restaurant from '../infra/typeorm/entities/Restaurant';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

interface IRequest {
  restaurant_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateRestaurantProfileService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    restaurant_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<Restaurant> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('Restaurant not found');
    }

    const restaurantWithUpdatedEmail = await this.restaurantsRepository.findByEmail(
      email,
    );

    if (
      restaurantWithUpdatedEmail &&
      restaurantWithUpdatedEmail.id !== restaurant_id
    ) {
      throw new AppError('E-mail already in use.');
    }

    restaurant.name = name;
    restaurant.email = email;

    if (password && !old_password) {
      throw new AppError(
        'You need to inform old password to set a new password.',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        restaurant.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      restaurant.password = await this.hashProvider.generateHash(password);
    }

    return this.restaurantsRepository.save(restaurant);
  }
}

export default UpdateRestaurantProfileService;
