import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRestaurantService from '@modules/restaurants/services/CreateRestaurantService';
import ListRestaurantsService from '@modules/restaurants/services/ListRestaurantsService';

export default class RestaurantsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listRestaurants = container.resolve(ListRestaurantsService);

    const restaurants = await listRestaurants.execute();

    return response.json(restaurants);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createRestaurant = container.resolve(CreateRestaurantService);

    const restaurant = await createRestaurant.execute({
      name,
      email,
      password,
    });

    const restaurantWithoutPassword = {
      id: restaurant.id,
      name: restaurant.name,
      email: restaurant.email,
      created_at: restaurant.created_at,
      updated_at: restaurant.updated_at,
    };

    return response.json(restaurantWithoutPassword);
  }
}
