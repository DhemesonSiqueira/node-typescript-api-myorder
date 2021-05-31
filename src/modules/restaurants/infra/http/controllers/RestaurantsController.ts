import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRestaurantService from '@modules/restaurants/services/CreateRestaurantService';
import ListRestaurantsService from '@modules/restaurants/services/ListRestaurantsService';
import ShowRestaurantService from '@modules/restaurants/services/ShowRestaurantService';

export default class RestaurantsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listRestaurants = container.resolve(ListRestaurantsService);

    const restaurants = await listRestaurants.execute();

    const restaurantsWithoutPassword = restaurants.map(restaurant => {
      return {
        id: restaurant.id,
        name: restaurant.name,
        email: restaurant.email,
        image: restaurant.image,
        created_at: restaurant.created_at,
        updated_at: restaurant.updated_at,
      };
    });

    return response.json(restaurantsWithoutPassword);
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

  public async show(request: Request, response: Response): Promise<Response> {
    const { restaurant_id } = request.params;

    const showRestaurant = container.resolve(ShowRestaurantService);

    const restaurant = await showRestaurant.execute({ restaurant_id });

    const restaurantWithoutPassword = {
      id: restaurant.id,
      name: restaurant.name,
      email: restaurant.email,
      image: restaurant.image,
      created_at: restaurant.created_at,
      updated_at: restaurant.updated_at,
    };

    return response.json(restaurantWithoutPassword);
  }
}
