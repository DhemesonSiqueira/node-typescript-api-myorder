import { getRepository, Repository } from 'typeorm';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import ICreateRestaurantsDTO from '@modules/restaurants/dtos/ICreateRestaurantsDTO';
import Restaurant from '../entities/Restaurant';

class RestaurantsRepository implements IRestaurantsRepository {
  private ormRepository: Repository<Restaurant>;

  constructor() {
    this.ormRepository = getRepository(Restaurant);
  }

  public async findById(id: string): Promise<Restaurant | undefined> {
    const restaurant = await this.ormRepository
      .createQueryBuilder('restaurants')
      .leftJoinAndSelect('restaurants.address', 'address')
      .where('restaurants.id = :id', { id })
      .getOne();
    // findOne(
    //   { id },
    //   { relations: ['address'] },
    // );

    return restaurant;
  }

  public async findByEmail(email: string): Promise<Restaurant | undefined> {
    const restaurant = await this.ormRepository.findOne({
      where: { email },
    });

    return restaurant;
  }

  public async findAllRestaurants(): Promise<Restaurant[]> {
    const restaurants = await this.ormRepository.find();

    return restaurants;
  }

  public async create(
    restaurantData: ICreateRestaurantsDTO,
  ): Promise<Restaurant> {
    const restaurant = this.ormRepository.create(restaurantData);

    await this.ormRepository.save(restaurant);

    return restaurant;
  }

  public async save(restaurant: Restaurant): Promise<Restaurant> {
    return this.ormRepository.save(restaurant);
  }
}

export default RestaurantsRepository;
