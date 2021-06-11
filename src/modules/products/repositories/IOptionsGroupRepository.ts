import { DeleteResult } from 'typeorm';
import ICreateOptionGroupDTO from '../dtos/ICreateOptionGroupDTO';
import OptionGroup from '../infra/typeorm/entities/OptionGroup';

export default interface IOptionGroupRepository {
  findAllOptionsGroup(restaurant_id: string): Promise<OptionGroup[]>;
  findById(id: string): Promise<OptionGroup | undefined>;
  create(data: ICreateOptionGroupDTO): Promise<OptionGroup>;
  save(optionGroup: OptionGroup): Promise<OptionGroup>;
  delete(optionGroup_id: string): Promise<DeleteResult>;
}
