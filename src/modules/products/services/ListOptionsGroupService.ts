import { injectable, inject } from 'tsyringe';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import AppError from '@shared/errors/AppError';
import OptionGroup from '../infra/typeorm/entities/OptionGroup';
import IOptionsGroupRepository from '../repositories/IOptionsGroupRepository';

@injectable()
class ListOptionsGroupService {
  constructor(
    @inject('OptionsGroupRepository')
    private optionsGroupRepository: IOptionsGroupRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute(restaurant_id: string): Promise<OptionGroup[]> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('You do not have permission!');
    }

    const optionsGroup = await this.optionsGroupRepository.findAllOptionsGroup(
      restaurant_id,
    );

    return optionsGroup;
  }
}

export default ListOptionsGroupService;
