import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Table from '../infra/typeorm/entities/Table';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';
import ITablesRepository from '../repositories/ITablesRepository';

interface IRequest {
  table_id: string;
  restaurant_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('TablesRepository')
    private tablesRepository: ITablesRepository,
  ) {}

  public async execute({ table_id, restaurant_id }: IRequest): Promise<Table> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('Restaurant not found');
    }

    const table = await this.tablesRepository.findById(table_id);

    if (!table || table.restaurant_id !== restaurant_id) {
      throw new AppError('Table not found');
    }

    return table;
  }
}

export default ShowProfileService;
