import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateRestaurantImageService from '@modules/restaurants/services/UpdateRestaurantImageService';

export default class RestaurantImageController {
  public async create(request: Request, response: Response): Promise<Response> {
    const updateRestaurantImage = container.resolve(
      UpdateRestaurantImageService,
    );

    const restaurant = await updateRestaurantImage.execute({
      restaurant_id: request.restaurant.id,
      imageFilename: request.file.filename,
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
