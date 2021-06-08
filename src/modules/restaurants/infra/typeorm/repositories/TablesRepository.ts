import { DeleteResult, getRepository, Repository } from 'typeorm';

import ITablesRepository from '@modules/restaurants/repositories/ITablesRepository';
import ICreateTableDTO from '@modules/restaurants/dtos/ICreateTableDTO';
import Table from '../entities/Table';

class TablesRepository implements ITablesRepository {
  private ormRepository: Repository<Table>;

  constructor() {
    this.ormRepository = getRepository(Table);
  }

  public async create(data: ICreateTableDTO): Promise<Table> {
    const table = this.ormRepository.create(data);

    await this.ormRepository.save(table);

    return table;
  }

  public async findAllTables(restaurant_id: string): Promise<Table[]> {
    const tables: Table[] = await this.ormRepository.find({
      where: { restaurant_id },
    });

    return tables;
  }

  public async findById(id: string): Promise<Table | undefined> {
    const table = await this.ormRepository.findOne({
      where: { id },
    });

    return table;
  }

  public async findByNumber(number: number): Promise<Table | undefined> {
    const table = await this.ormRepository.findOne({
      where: { number },
    });

    return table;
  }

  public async save(table: Table): Promise<Table> {
    return this.ormRepository.save(table);
  }

  public async delete(table_id: string): Promise<DeleteResult> {
    const result = await this.ormRepository.delete({ id: table_id });

    return result;
  }
}

export default TablesRepository;
