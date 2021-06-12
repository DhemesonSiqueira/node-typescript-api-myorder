import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import IOptionsRepository from '../repositories/IOptionsRepository';
import Option from '../infra/typeorm/entities/Option';

interface IRequest {
  restaurant_id: string;
  option_id: string;
  name: string;
  description: string;
  price: number;
}

@injectable()
class UpdateOptionService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('OptionsRepository')
    private optionsRepository: IOptionsRepository,
  ) {}

  public async execute({
    restaurant_id,
    option_id,
    name,
    description,
    price,
  }: IRequest): Promise<Option> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('You do not have permission!');
    }

    const option = await this.optionsRepository.findById(option_id);

    if (!option) {
      throw new AppError('Option does not exist!');
    }

    option.name = name;
    option.description = description;
    option.price = price;

    return this.optionsRepository.save(option);
  }
}

export default UpdateOptionService;
