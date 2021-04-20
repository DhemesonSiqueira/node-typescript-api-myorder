import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import Restaurant from '../infra/typeorm/entities/Restaurant';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

interface IRequest {
  restaurant_id: string;
  imageFilename: string;
}

@injectable()
class UpdateRestaurantImageService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    restaurant_id,
    imageFilename,
  }: IRequest): Promise<Restaurant> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('Only authenticated restaurant can change image', 401);
    }

    if (restaurant.image) {
      await this.storageProvider.deleteFile(imageFilename);
    }

    const fileName = await this.storageProvider.saveFile(imageFilename);

    restaurant.image = fileName;

    await this.restaurantsRepository.save(restaurant);

    return restaurant;
  }
}

export default UpdateRestaurantImageService;
