import { injectable, inject } from 'tsyringe';

import Restaurant from '../infra/typeorm/entities/Restaurant';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

@injectable()
class ListRestaurantsService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute(): Promise<Restaurant[]> {
    const restaurants = await this.restaurantsRepository.findAllRestaurants();

    return restaurants;
  }
}

export default ListRestaurantsService;
