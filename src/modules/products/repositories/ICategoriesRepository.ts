import { DeleteResult } from 'typeorm';
import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import Category from '../infra/typeorm/entities/Category';

export default interface IUsersRepository {
  findAllCategories(restaurant_id: string): Promise<Category[]>;
  findAllCategoriesWithProducts(restaurant_id: string): Promise<Category[]>;
  findById(id: string): Promise<Category | undefined>;
  create(data: ICreateCategoryDTO): Promise<Category>;
  save(category: Category): Promise<Category>;
  delete(category_id: string): Promise<DeleteResult>;
}
