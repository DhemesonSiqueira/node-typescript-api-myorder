import Restaurant from '../infra/typeorm/entities/Restaurant';
import ICreateRestaurantsDTO from '../dtos/ICreateRestaurantsDTO';

export default interface IRestaurantsRepository {
  findAllRestaurants(): Promise<Restaurant[]>;
  findById(id: string): Promise<Restaurant | undefined>;
  findByEmail(email: string): Promise<Restaurant | undefined>;
  create(data: ICreateRestaurantsDTO): Promise<Restaurant>;
  save(restaurant: Restaurant): Promise<Restaurant>;
}
