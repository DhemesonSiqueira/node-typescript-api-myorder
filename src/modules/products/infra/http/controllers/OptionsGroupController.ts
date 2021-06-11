import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOptionGroupService from '@modules/products/services/CreateOptionGroupService';
import ListOptionsGroupService from '@modules/products/services/ListOptionsGroupService';

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

  // public async show(request: Request, response: Response): Promise<Response> {
  //   const { category_id } = request.params;
  //   const restaurant_id = request.restaurant.id;

  //   const showCategory = container.resolve(ShowCategoryService);

  //   const category = await showCategory.execute({ category_id, restaurant_id });

  //   return response.json(category);
  // }

  // public async update(request: Request, response: Response): Promise<Response> {
  //   const { category_id } = request.params;
  //   const restaurant_id = request.restaurant.id;

  //   const { name, description } = request.body;

  //   const updateCategory = container.resolve(UpdateCategoryService);

  //   const category = await updateCategory.execute({
  //     category_id,
  //     restaurant_id,
  //     name,
  //     description,
  //   });

  //   return response.json(category);
  // }

  // public async destroy(
  //   request: Request,
  //   response: Response,
  // ): Promise<Response> {
  //   const restaurant_id = request.restaurant.id;
  //   const { category_id } = request.params;

  //   const deleteCategory = container.resolve(DeleteCategoryService);

  //   await deleteCategory.execute({
  //     restaurant_id,
  //     category_id,
  //   });

  //   return response.status(204).json({ message: 'deleted' });
  // }
}
