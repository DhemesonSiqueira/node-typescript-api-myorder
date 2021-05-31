import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Restaurant from '../infra/typeorm/entities/Restaurant';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

interface IRequest {
  restaurant_id: string;
}

@injectable()
class ShowRestaurantService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute({ restaurant_id }: IRequest): Promise<Restaurant> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('Restaurant not found');
    }

    return restaurant;
  }
}

export default ShowRestaurantService;
