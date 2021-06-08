import { inject, injectable } from 'tsyringe';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import AppError from '@shared/errors/AppError';
import Table from '../infra/typeorm/entities/Table';
import ITablesRepository from '../repositories/ITablesRepository';

interface IRequest {
  restaurant_id: string;
  number: number;
  description: string;
}

@injectable()
class CreateTableService {
  constructor(
    @inject('TablesRepository')
    private tablesRepository: ITablesRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute({
    restaurant_id,
    number,
    description,
  }: IRequest): Promise<Table> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('You do not have permission!');
    }

    const hasTable = await this.tablesRepository.findByNumber(number);

    if (hasTable && hasTable.restaurant_id === restaurant_id) {
      throw new AppError('Table number already exists!');
    }

    const table = await this.tablesRepository.create({
      number,
      description,
      restaurant_id,
    });

    return table;
  }
}

export default CreateTableService;
