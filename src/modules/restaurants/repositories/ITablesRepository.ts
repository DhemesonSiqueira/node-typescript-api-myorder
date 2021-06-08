import { DeleteResult } from 'typeorm';
import ICreateTableDTO from '../dtos/ICreateTableDTO';
import Table from '../infra/typeorm/entities/Table';

export default interface IUsersRepository {
  findAllTables(restaurant_id: string): Promise<Table[]>;
  findById(id: string): Promise<Table | undefined>;
  findByNumber(number: number): Promise<Table | undefined>;
  create(data: ICreateTableDTO): Promise<Table>;
  save(table: Table): Promise<Table>;
  delete(table_id: string): Promise<DeleteResult>;
}
