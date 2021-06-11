import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import IOptionsGroupRepository from '../repositories/IOptionsGroupRepository';
import OptionGroup from '../infra/typeorm/entities/OptionGroup';

interface IRequest {
  restaurant_id: string;
  group_id: string;
  name: string;
  description: string;
  required: boolean;
  max_quantity: number;
  min_quantity: number;
}

@injectable()
class UpdateOptionGroupService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('OptionsGroupRepository')
    private optionsGroupRepository: IOptionsGroupRepository,
  ) {}

  public async execute({
    group_id,
    restaurant_id,
    name,
    description,
    required,
    max_quantity,
    min_quantity,
  }: IRequest): Promise<OptionGroup> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('You do not have permission!');
    }

    const optionGroup = await this.optionsGroupRepository.findById(group_id);

    if (!optionGroup || optionGroup.restaurant_id !== restaurant_id) {
      throw new AppError('Option Group does not exist!');
    }

    optionGroup.name = name;
    optionGroup.description = description;
    optionGroup.required = required;
    optionGroup.max_quantity = max_quantity;
    optionGroup.min_quantity = min_quantity;

    return this.optionsGroupRepository.save(optionGroup);
  }
}

export default UpdateOptionGroupService;
