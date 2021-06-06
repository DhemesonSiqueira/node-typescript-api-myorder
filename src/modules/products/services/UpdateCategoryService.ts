import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import Category from '../infra/typeorm/entities/Category';

interface IRequest {
  restaurant_id: string;
  category_id: string;
  name: string;
  description: string;
}

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    restaurant_id,
    category_id,
    name,
    description,
  }: IRequest): Promise<Category> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('You do not have permission!');
    }

    const category = await this.categoriesRepository.findById(category_id);

    if (!category) {
      throw new AppError('Category does not exist!');
    }

    if (category.restaurant_id !== restaurant_id) {
      throw new AppError('Category does not exist!');
    }

    category.name = name;
    category.description = description;

    return this.categoriesRepository.save(category);
  }
}

export default UpdateCategoryService;
