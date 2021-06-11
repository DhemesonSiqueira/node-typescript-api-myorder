import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import IOptionsGroupRepository from '../repositories/IOptionsGroupRepository';

interface IRequest {
  restaurant_id: string;
  group_id: string;
}

@injectable()
class DeleteOptionGroupService {
  constructor(
    @inject('OptionsGroupRepository')
    private optionsGroupRepository: IOptionsGroupRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute({
    restaurant_id,
    group_id,
  }: IRequest): Promise<void> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('Restaurant does not exist!');
    }

    const optionGroup = await this.optionsGroupRepository.findById(group_id);

    if (!optionGroup || optionGroup.restaurant_id !== restaurant_id) {
      throw new AppError('Category not found');
    }

    const deleted = await this.optionsGroupRepository.delete(group_id);

    if (!deleted.affected) {
      throw new AppError('Not deleted');
    }
  }
}

export default DeleteOptionGroupService;
