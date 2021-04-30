import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';
import IRestaurantTokensRepository from '../repositories/IRestaurantTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('RestaurantTokensRepository')
    private restaurantTokensRepository: IRestaurantTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const restaurantToken = await this.restaurantTokensRepository.findByToken(
      token,
    );

    if (!restaurantToken) {
      throw new AppError('Restaurant token does not exists');
    }

    const restaurant = await this.restaurantsRepository.findById(
      restaurantToken.restaurant_id,
    );

    if (!restaurant) {
      throw new AppError('Restaurant does not exists');
    }

    const tokenCreatedAt = restaurantToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expires');
    }

    restaurant.password = await this.hashProvider.generateHash(password);

    await this.restaurantsRepository.save(restaurant);
  }
}

export default ResetPasswordService;
