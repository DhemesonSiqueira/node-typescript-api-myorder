import { inject, injectable } from 'tsyringe';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  restaurant_id: string;
  name: string;
  description: string;
  category_id: string;
  price: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    restaurant_id,
    name,
    description,
    category_id,
    price,
  }: IRequest): Promise<Product> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('You do not have permission!');
    }

    const category = await this.categoriesRepository.findById(category_id);

    if (!category) {
      throw new AppError('Category does not exist!');
    }

    const product = await this.productsRepository.create({
      name,
      description,
      category_id,
      price,
    });

    return product;
  }
}

export default CreateProductService;
