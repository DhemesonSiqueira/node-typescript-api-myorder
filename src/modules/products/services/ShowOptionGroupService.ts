import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import OptionGroup from '../infra/typeorm/entities/OptionGroup';
import IOptionsGroupRepository from '../repositories/IOptionsGroupRepository';

interface IRequest {
  group_id: string;
  restaurant_id: string;
}

@injectable()
class ShowOptionGroupService {
  constructor(
    @inject('OptionsGroupRepository')
    private optionsGroupRepository: IOptionsGroupRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute({
    group_id,
    restaurant_id,
  }: IRequest): Promise<OptionGroup> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('Restaurant does not exist!');
    }

    const optionGroup = await this.optionsGroupRepository.findById(group_id);

    if (!optionGroup || optionGroup.restaurant_id !== restaurant_id) {
      throw new AppError('Option Group not found');
    }

    return optionGroup;
  }
}

export default ShowOptionGroupService;
