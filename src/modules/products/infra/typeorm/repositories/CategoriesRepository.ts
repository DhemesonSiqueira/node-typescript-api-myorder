import { DeleteResult, getRepository, Repository } from 'typeorm';

import ICategoriesRepository from '@modules/products/repositories/ICategoriesRepository';
import ICreateCategoryDTO from '@modules/products/dtos/ICreateCategoryDTO';
import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async create(categoryData: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create(categoryData);

    await this.ormRepository.save(category);

    return category;
  }

  public async findAllCategories(id: string): Promise<Category[]> {
    const categories: Category[] = await this.ormRepository.find({
      where: { restaurant_id: { id } },
    });

    return categories;
  }

  public async findAllCategoriesWithProducts(id: string): Promise<Category[]> {
    const categories: Category[] = await this.ormRepository.find({
      where: { restaurant_id: { id } },
      relations: ['products'],
    });

    return categories;
  }

  public async findById(id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: { id },
    });

    return category;
  }

  public async save(category: Category): Promise<Category> {
    return this.ormRepository.save(category);
  }

  public async delete(category_id: string): Promise<DeleteResult> {
    const result = await this.ormRepository.delete({ id: category_id });

    return result;
  }
}

export default CategoriesRepository;
