import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import Category from '../infra/typeorm/entities/Category';

@injectable()
class ListProductsService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute(restaurant_id: string): Promise<Category[]> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('Restaurant does not exist!');
    }

    const products = await this.categoriesRepository.findAllCategoriesWithProducts(
      restaurant_id,
    );

    return products;
  }
}

export default ListProductsService;
