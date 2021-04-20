import { getRepository, Repository } from 'typeorm';

import IRestaurantTokensRepository from '@modules/restaurants/repositories/IRestaurantTokensRepository';
import RestaurantToken from '../entities/RestaurantToken';

class RestaurantTokensRepository implements IRestaurantTokensRepository {
  private ormRepository: Repository<RestaurantToken>;

  constructor() {
    this.ormRepository = getRepository(RestaurantToken);
  }

  public async findByToken(
    token: string,
  ): Promise<RestaurantToken | undefined> {
    const restaurantToken = await this.ormRepository.findOne({
      where: { token },
    });

    return restaurantToken;
  }

  public async generate(restaurant_id: string): Promise<RestaurantToken> {
    const restaurantToken = this.ormRepository.create({ restaurant_id });

    await this.ormRepository.save(restaurantToken);

    return restaurantToken;
  }
}

export default RestaurantTokensRepository;
