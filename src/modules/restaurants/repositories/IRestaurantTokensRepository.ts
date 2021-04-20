import RestaurantToken from '../infra/typeorm/entities/RestaurantToken';

export default interface IRestaurantTokensRepository {
  generate(restaurant_id: string): Promise<RestaurantToken>;
  findByToken(token: string): Promise<RestaurantToken | undefined>;
}
