import { getRepository, Repository } from 'typeorm';

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

  public async findAllCategories(): Promise<Category[]> {
    const categories: Category[] = await this.ormRepository.find();

    return categories;
  }

  // public async findById(id: string): Promise<Category | undefined> {
  //   const product = await this.ormRepository.findOne({
  //     where: { id },
  //   });

  //   return product;
  // }

  // public async save(product: Product): Promise<Category> {
  //   return this.ormRepository.save(product);
  // }
}

export default CategoriesRepository;
