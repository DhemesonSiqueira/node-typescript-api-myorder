import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateRestaurantService from '@modules/restaurants/services/AuthenticateRestaurantService';

export default class RestaurantSessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateRestaurant = container.resolve(
      AuthenticateRestaurantService,
    );

    const { restaurant, token } = await authenticateRestaurant.execute({
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

    return response.json({ restaurant: restaurantWithoutPassword, token });
  }
}
