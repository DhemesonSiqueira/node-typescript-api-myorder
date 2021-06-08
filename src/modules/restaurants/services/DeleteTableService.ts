import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import ITablesRepository from '../repositories/ITablesRepository';

interface IRequest {
  restaurant_id: string;
  table_id: string;
}

@injectable()
class DeleteTableService {
  constructor(
    @inject('TablesRepository')
    private tablesRepository: ITablesRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute({ restaurant_id, table_id }: IRequest): Promise<void> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('Restaurant does not exist!');
    }

    const table = await this.tablesRepository.findById(table_id);

    if (!table) {
      throw new AppError('Table not found');
    }

    if (table.restaurant_id !== restaurant_id) {
      throw new AppError('Table not found');
    }

    const deleted = await this.tablesRepository.delete(table_id);

    if (!deleted.affected) {
      throw new AppError('Not deleted');
    }
  }
}

export default DeleteTableService;
