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

  public async findAllOptionsGroup(id: string): Promise<OptionGroup[]> {
    const optionsGroup: OptionGroup[] = await this.ormRepository.find({
      where: { restaurant_id: { id } },
    });

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

  public async delete(optionGroup_id: string): Promise<DeleteResult> {
    const result = await this.ormRepository.delete({ id: optionGroup_id });

    return result;
  }
}

export default OptionsGroupRepository;
