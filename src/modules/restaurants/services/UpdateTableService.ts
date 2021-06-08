import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import ITablesRepository from '../repositories/ITablesRepository';
import Table from '../infra/typeorm/entities/Table';

interface IRequest {
  restaurant_id: string;
  table_id: string;
  number: number;
  description: string;
}

@injectable()
class UpdateTableService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('TablesRepository')
    private tablesRepository: ITablesRepository,
  ) {}

  public async execute({
    restaurant_id,
    table_id,
    number,
    description,
  }: IRequest): Promise<Table> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('You do not have permission!');
    }

    const table = await this.tablesRepository.findById(table_id);

    if (!table) {
      throw new AppError('Table does not exist!');
    }

    if (table.restaurant_id !== restaurant_id) {
      throw new AppError('Table does not exist!');
    }

    if (table.number === number) {
      throw new AppError('Table number already exists!');
    }

    table.number = number;
    table.description = description;

    return this.tablesRepository.save(table);
  }
}

export default UpdateTableService;
