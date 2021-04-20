import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IUsersRepository {
  findAllProducts(): Promise<Product[]>;
  create(data: ICreateProductDTO): Promise<Product>;
}
