import { DeleteResult, getRepository, Repository } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create(productData: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(productData);

    await this.ormRepository.save(product);

    return product;
  }

  public async findAllProducts(id: string): Promise<Product[]> {
    const products: Product[] = await this.ormRepository.find({
      where: { restaurant_id: { id } },
    });

    return products;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { id },
    });

    return product;
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

  public async delete(product_id: string): Promise<DeleteResult> {
    const result = await this.ormRepository.delete({ id: product_id });

    return result;
  }
}

export default ProductsRepository;
