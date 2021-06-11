import { inject, injectable } from 'tsyringe';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import AppError from '@shared/errors/AppError';
import OptionGroup from '../infra/typeorm/entities/OptionGroup';
import IOptionsGroupRepository from '../repositories/IOptionsGroupRepository';

interface IRequest {
  restaurant_id: string;
  name: string;
  description: string;
  required: boolean;
  max_quantity: number;
  min_quantity: number;
  product_id: string;
}

@injectable()
class CreateOptionGroupService {
  constructor(
    @inject('OptionsGroupRepository')
    private optionsGroupRepository: IOptionsGroupRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute({
    restaurant_id,
    name,
    description,
    required,
    max_quantity,
    min_quantity,
    product_id,
  }: IRequest): Promise<OptionGroup> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('You do not have permission!');
    }

    const optionGroup = await this.optionsGroupRepository.create({
      restaurant_id,
      name,
      description,
      required,
      max_quantity,
      min_quantity,
      product_id,
    });

    return optionGroup;
  }
}

export default CreateOptionGroupService;
