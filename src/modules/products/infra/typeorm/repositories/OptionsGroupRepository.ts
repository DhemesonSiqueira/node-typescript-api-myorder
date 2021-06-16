import { DeleteResult, getRepository, Repository } from 'typeorm';

import IOptionsGroupRepository from '@modules/products/repositories/IOptionsGroupRepository';
import ICreateOptionGroupDTO from '@modules/products/dtos/ICreateOptionGroupDTO';
import OptionGroup from '../entities/OptionGroup';

class OptionsGroupRepository implements IOptionsGroupRepository {
  private ormRepository: Repository<OptionGroup>;

  constructor() {
    this.ormRepository = getRepository(OptionGroup);
  }

  public async create(
    optionGroupData: ICreateOptionGroupDTO,
  ): Promise<OptionGroup> {
    const optionGroup = this.ormRepository.create(optionGroupData);

    await this.ormRepository.save(optionGroup);

    return optionGroup;
  }

  public async findAllOptionsGroup(
    restaurant_id: string,
    product_id: string,
  ): Promise<OptionGroup[]> {
    const optionsGroup = await this.ormRepository.find({});

    return optionsGroup;
  }

  public async findById(id: string): Promise<OptionGroup | undefined> {
    const optionGroup = await this.ormRepository.findOne({
      where: { id },
    });

    return optionGroup;
  }

  public async save(optionGroup: OptionGroup): Promise<OptionGroup> {
    return this.ormRepository.save(optionGroup);
  }

  public async delete(group_id: string): Promise<DeleteResult> {
    const result = await this.ormRepository.delete({ id: group_id });

    return result;
  }
}

export default OptionsGroupRepository;
