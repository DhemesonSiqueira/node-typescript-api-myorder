import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IUsersRepository {
  findAllProducts(): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  create(data: ICreateProductDTO): Promise<Product>;
  save(product: Product): Promise<Product>;
}
