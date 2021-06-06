import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  restaurant_id: string;
  category_id: string;
}

@injectable()
class DeleteCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute({
    restaurant_id,
    category_id,
  }: IRequest): Promise<void> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('Restaurant does not exist!');
    }

    const category = await this.categoriesRepository.findById(category_id);

    if (!category) {
      throw new AppError('Category not found');
    }

    if (category.restaurant_id !== restaurant_id) {
      throw new AppError('Category not found');
    }

    const deleted = await this.categoriesRepository.delete(category_id);

    if (!deleted.affected) {
      throw new AppError('Not deleted');
    }
  }
}

export default DeleteCategoryService;
