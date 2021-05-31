import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import Category from '../infra/typeorm/entities/Category';

export default interface IUsersRepository {
  findAllCategories(): Promise<Category[]>;
  // findById(id: string): Promise<Product | undefined>;
  create(data: ICreateCategoryDTO): Promise<Category>;
  // save(product: Product): Promise<Product>;
}
