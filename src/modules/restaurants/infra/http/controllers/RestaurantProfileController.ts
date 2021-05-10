import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/restaurants/services/UpdateProfileService';
import ShowProfileService from '@modules/restaurants/services/ShowProfileService';

export default class RestaurantProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const restaurant_id = request.restaurant.id;

    const showProfile = container.resolve(ShowProfileService);

    const restaurant = await showProfile.execute({ restaurant_id });

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

  public async update(request: Request, response: Response): Promise<Response> {
    const restaurant_id = request.restaurant.id;

    const { name, email, old_password, password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const restaurant = await updateProfile.execute({
      restaurant_id,
      name,
      email,
      old_password,
      password,
    });

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
