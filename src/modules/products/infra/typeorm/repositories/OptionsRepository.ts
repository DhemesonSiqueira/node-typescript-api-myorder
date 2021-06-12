import { DeleteResult, getRepository, Repository } from 'typeorm';

import IOptionsRepository from '@modules/products/repositories/IOptionsGroupRepository';
import ICreateOptionDTO from '@modules/products/dtos/ICreateOptionDTO';
import Option from '../entities/Option';

class OptionsRepository implements IOptionsRepository {
  private ormRepository: Repository<Option>;

  constructor() {
    this.ormRepository = getRepository(Option);
  }

  public async create(
    optionData: ICreateOptionDTO,
  ): Promise<Option> {
    const option = this.ormRepository.create(optionData);

    await this.ormRepository.save(option);

    return option;
  }

  public async findById(id: string): Promise<Option | undefined> {
    const option = await this.ormRepository.findOne({
      where: { id },
    });

    return option;
  }

  public async save(option: Option): Promise<Option> {
    return this.ormRepository.save(option);
  }

  public async delete(option_id: string): Promise<DeleteResult> {
    const result = await this.ormRepository.delete({ id: option_id });

    return result;
  }
}

export default OptionsRepository;
