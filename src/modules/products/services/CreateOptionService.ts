import { inject, injectable } from 'tsyringe';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import AppError from '@shared/errors/AppError';
import Option from '../infra/typeorm/entities/Option';
import IOptionsRepository from '../repositories/IOptionsRepository';

interface IRequest {
  restaurant_id: string;
  group_id: string;
  name: string;
  description: string;
  price: number;
}

@injectable()
class CreateOptionService {
  constructor(
    @inject('OptionsRepository')
    private optionsRepository: IOptionsRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute({
    restaurant_id,
    group_id,
    name,
    description,
    price,
  }: IRequest): Promise<Option> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('You do not have permission!');
    }

    const option = await this.optionsRepository.create({
      group_id,
      name,
      description,
      price,
    });

    return option;
  }
}

export default CreateOptionService;
