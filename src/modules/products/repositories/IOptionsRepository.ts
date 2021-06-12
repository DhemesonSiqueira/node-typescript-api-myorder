import { DeleteResult } from 'typeorm';
import ICreateOptionDTO from '../dtos/ICreateOptionDTO';
import Option from '../infra/typeorm/entities/Option';

export default interface IOptionsRepository {
  findAllOptions(restaurant_id: string): Promise<Option[]>;
  findById(id: string): Promise<Option | undefined>;
  create(data: ICreateOptionDTO): Promise<Option>;
  save(option: Option): Promise<Option>;
  delete(option_id: string): Promise<DeleteResult>;
}
