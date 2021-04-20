import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import Restaurant from '../infra/typeorm/entities/Restaurant';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  restaurant: Restaurant;
  token: string;
}

@injectable()
class AuthenticateRestaurantService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const restaurant = await this.restaurantsRepository.findByEmail(email);

    if (!restaurant) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      restaurant.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: restaurant.id,
      expiresIn,
    });

    return {
      restaurant,
      token,
    };
  }
}

export default AuthenticateRestaurantService;
