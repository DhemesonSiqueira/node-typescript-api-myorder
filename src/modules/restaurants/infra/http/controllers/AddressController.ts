import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAddressService from '@modules/restaurants/services/CreateAddressService';
import ShowAddressService from '@modules/restaurants/services/ShowAddressService';
import UpdateAddressService from '@modules/restaurants/services/UpdateAddressService';
import DeleteAddressService from '@modules/restaurants/services/DeleteAddressService';

export default class AddressController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      country,
      state,
      city,
      address,
      number,
      additional,
      cep,
    } = request.body;
    const restaurant_id = request.restaurant.id;

    const createAddress = container.resolve(CreateAddressService);

    const addressRestaurant = await createAddress.execute({
      restaurant_id,
      country,
      state,
      city,
      address,
      number,
      additional,
      cep,
    });

    return response.json(addressRestaurant);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { restaurant_id } = request.params;

    const showAddress = container.resolve(ShowAddressService);

    const address = await showAddress.execute(restaurant_id);

    return response.json(address);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      country,
      state,
      city,
      address,
      number,
      additional,
      cep,
    } = request.body;
    const restaurant_id = request.restaurant.id;

    const updateAddress = container.resolve(UpdateAddressService);

    const restaurantAddress = await updateAddress.execute({
      restaurant_id,
      country,
      state,
      city,
      address,
      number,
      additional,
      cep,
    });

    return response.json(restaurantAddress);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const restaurant_id = request.restaurant.id;
    const { address_id } = request.params;

    const deleteAddress = container.resolve(DeleteAddressService);

    await deleteAddress.execute({
      restaurant_id,
      address_id,
    });

    return response.status(204).json({ message: 'deleted' });
  }
}
