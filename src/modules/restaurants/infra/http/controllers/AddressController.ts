import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAddressService from '@modules/restaurants/services/CreateAddressService';
import ShowAddressService from '@modules/restaurants/services/ShowAddressService';

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

  // public async update(request: Request, response: Response): Promise<Response> {
  //   const { table_id } = request.params;
  //   const restaurant_id = request.restaurant.id;

  //   const { number, description } = request.body;

  //   const updateTable = container.resolve(UpdateTableService);

  //   const table = await updateTable.execute({
  //     table_id,
  //     restaurant_id,
  //     number,
  //     description,
  //   });

  //   return response.json(table);
  // }

  // public async destroy(
  //   request: Request,
  //   response: Response,
  // ): Promise<Response> {
  //   const restaurant_id = request.restaurant.id;
  //   const { table_id } = request.params;

  //   const deleteTable = container.resolve(DeleteTableService);

  //   await deleteTable.execute({
  //     restaurant_id,
  //     table_id,
  //   });

  //   return response.status(204).json({ message: 'deleted' });
  // }
}
