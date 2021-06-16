import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOptionService from '@modules/products/services/CreateOptionService';
import UpdateOptionService from '@modules/products/services/UpdateOptionService';
import DeleteOptionService from '@modules/products/services/DeleteOptionService';

export default class OptionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, price, group_id } = request.body;
    const restaurant_id = request.restaurant.id;

    const createOption = container.resolve(CreateOptionService);

    const option = await createOption.execute({
      restaurant_id,
      group_id,
      name,
      description,
      price,
    });

    return response.json(option);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { option_id } = request.params;
    const restaurant_id = request.restaurant.id;

    const { name, description, price } = request.body;

    const updateOption = container.resolve(UpdateOptionService);

    const option = await updateOption.execute({
      restaurant_id,
      option_id,
      name,
      description,
      price,
    });

    return response.json(option);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const restaurant_id = request.restaurant.id;
    const { option_id } = request.params;

    const deleteOption = container.resolve(DeleteOptionService);

    await deleteOption.execute({
      restaurant_id,
      option_id,
    });

    return response.status(204).json({ message: 'deleted' });
  }
}
