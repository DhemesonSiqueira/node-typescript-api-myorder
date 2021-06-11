import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOptionGroupService from '@modules/products/services/CreateOptionGroupService';
import ListOptionsGroupService from '@modules/products/services/ListOptionsGroupService';
import UpdateOptionGroupService from '@modules/products/services/UpdateOptionGroupService';
import DeleteOptionGroupService from '@modules/products/services/DeleteOptionGroupService';
import ShowOptionGroupService from '@modules/products/services/ShowOptionGroupService';

export default class OptionsGroupController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      required,
      max_quantity,
      min_quantity,
      product_id,
    } = request.body;
    const restaurant_id = request.restaurant.id;

    const createOptionGroup = container.resolve(CreateOptionGroupService);

    const optionGroup = await createOptionGroup.execute({
      restaurant_id,
      product_id,
      name,
      description,
      required,
      max_quantity,
      min_quantity,
    });

    return response.json(optionGroup);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const restaurant_id = request.restaurant.id;

    const listOptionsGroup = container.resolve(ListOptionsGroupService);

    const optionsGroup = await listOptionsGroup.execute(restaurant_id);

    return response.json(optionsGroup);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { group_id } = request.params;
    const restaurant_id = request.restaurant.id;

    const showOptionGroup = container.resolve(ShowOptionGroupService);

    const optionGroup = await showOptionGroup.execute({ group_id, restaurant_id });

    return response.json(optionGroup);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { group_id } = request.params;
    const restaurant_id = request.restaurant.id;

    const {
      name,
      description,
      required,
      max_quantity,
      min_quantity,
    } = request.body;

    const updateOptionGroup = container.resolve(UpdateOptionGroupService);

    const optionGroup = await updateOptionGroup.execute({
      group_id,
      restaurant_id,
      name,
      description,
      required,
      max_quantity,
      min_quantity,
    });

    return response.json(optionGroup);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const restaurant_id = request.restaurant.id;
    const { group_id } = request.params;

    const deleteOptionGroup = container.resolve(DeleteOptionGroupService);

    await deleteOptionGroup.execute({
      restaurant_id,
      group_id,
    });

    return response.status(204).json({ message: 'deleted' });
  }
}
