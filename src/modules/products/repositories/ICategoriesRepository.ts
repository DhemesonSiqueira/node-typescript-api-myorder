import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import Category from '../infra/typeorm/entities/Category';

export default interface IUsersRepository {
  findAllCategories(restaurant_id: string): Promise<Category[]>;
  findById(id: string): Promise<Category | undefined>;
  create(data: ICreateCategoryDTO): Promise<Category>;
  // save(product: Product): Promise<Product>;
}
