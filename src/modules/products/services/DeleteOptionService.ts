import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import IOptionsRepository from '../repositories/IOptionsRepository';

interface IRequest {
  restaurant_id: string;
  option_id: string;
}

@injectable()
class DeleteOptionService {
  constructor(
    @inject('OptionsRepository')
    private optionsRepository: IOptionsRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute({
    restaurant_id,
    option_id,
  }: IRequest): Promise<void> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('Restaurant does not exist!');
    }

    const option = await this.optionsRepository.findById(option_id);

    if (!option) {
      throw new AppError('Option not found');
    }

    const deleted = await this.optionsRepository.delete(option_id);

    if (!deleted.affected) {
      throw new AppError('Not deleted');
    }
  }
}

export default DeleteOptionService;
