import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  category_id: string;
  restaurant_id: string;
}

@injectable()
class ShowCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute({
    category_id,
    restaurant_id,
  }: IRequest): Promise<Category> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('Restaurant does not exist!');
    }

    const category = await this.categoriesRepository.findById(category_id);

    if (!category || category.restaurant_id !== restaurant_id) {
      throw new AppError('Category not found');
    }

    return category;
  }
}

export default ShowCategoryService;
