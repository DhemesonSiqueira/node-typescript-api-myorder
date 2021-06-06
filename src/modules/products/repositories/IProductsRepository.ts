import { DeleteResult } from 'typeorm';
import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductsRepository {
  findAllProducts(restaurant_id: string): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  create(data: ICreateProductDTO): Promise<Product>;
  save(product: Product): Promise<Product>;
  delete(product_id: string): Promise<DeleteResult>;
}
