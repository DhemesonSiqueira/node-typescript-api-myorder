import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  restaurant_id: string;
  product_id: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute({ restaurant_id, product_id }: IRequest): Promise<void> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('Restaurant does not exist!');
    }

    const product = await this.productsRepository.findById(product_id);

    if (!product) {
      throw new AppError('Product not found');
    }

    if (product.restaurant_id !== restaurant_id) {
      throw new AppError('Product not found');
    }

    const deleted = await this.productsRepository.delete(product_id);

    if (!deleted.affected) {
      throw new AppError('Not deleted');
    }
  }
}

export default DeleteProductService;
