import { inject, injectable } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';
import IRestaurantTokensRepository from '../repositories/IRestaurantTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('RestaurantTokensRepository')
    private restaurantTokensRepository: IRestaurantTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const restaurant = await this.restaurantsRepository.findByEmail(email);

    if (!restaurant) {
      throw new AppError('Restaurant does not exists');
    }

    const { token } = await this.restaurantTokensRepository.generate(
      restaurant.id,
    );

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: restaurant.name,
        email: restaurant.email,
      },
      subject: '[myOrder] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: restaurant.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
