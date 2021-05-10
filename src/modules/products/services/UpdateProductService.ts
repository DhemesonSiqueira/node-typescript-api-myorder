import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  restaurant_id: string;
  product_id: string;
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
  ) {}

  public async execute({
    restaurant_id,
    product_id,
    name,
    description,
    price,
  }: IRequest): Promise<Product> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('You do not have permission!');
    }

    const product = await this.productsRepository.findById(product_id);

    if (!product) {
      throw new AppError('Product not found');
    }

    product.name = name;
    product.description = description;
    product.price = price;

    return this.productsRepository.save(product);
  }
}

export default UpdateProductProfileService;
