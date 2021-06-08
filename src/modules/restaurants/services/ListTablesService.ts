import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Table from '../infra/typeorm/entities/Table';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';
import ITablesRepository from '../repositories/ITablesRepository';

@injectable()
class ListTablesService {
  constructor(
    @inject('TablesRepository')
    private tablesRepository: ITablesRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute(restaurant_id: string): Promise<Table[]> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('You do not have permission!');
    }

    const tables = await this.tablesRepository.findAllTables(restaurant_id);

    return tables;
  }
}

export default ListTablesService;
