import { inject, injectable } from 'tsyringe';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  restaurant_id: string;
  name: string;
  description: string;
  price: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute({
    restaurant_id,
    name,
    description,
    price,
  }: IRequest): Promise<Product> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('You do not have permission!');
    }

    const product = await this.productsRepository.create({
      name,
      description,
      price,
    });

    return product;
  }
}

export default CreateProductService;
