import { inject, injectable } from 'tsyringe';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  description: string;
  price: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    name,
    description,
    price,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.create({
      name,
      description,
      price,
    });

    return product;
  }
}

export default CreateProductService;
