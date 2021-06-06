import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  restaurant_id: string;
  product_id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
}

@injectable()
class UpdateProductProfileService {
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
    product_id,
    category_id,
    name,
    description,
    price,
  }: IRequest): Promise<Product> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('You do not have permission!');
    }

    const product = await this.productsRepository.findById(product_id);

    if (!product || product.restaurant_id !== restaurant_id) {
      throw new AppError('Product not found');
    }

    const category = await this.categoriesRepository.findById(category_id);

    if (category && category.restaurant_id !== restaurant_id) {
      throw new AppError('Category does not exist!');
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.category_id = category_id;

    return this.productsRepository.save(product);
  }
}

export default UpdateProductProfileService;
