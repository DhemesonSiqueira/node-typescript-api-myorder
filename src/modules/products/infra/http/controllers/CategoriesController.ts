import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategoryService from '@modules/products/services/CreateCategoryService';
import ListCategoriesService from '@modules/products/services/ListCategoriesService';
import UpdateCategoryService from '@modules/products/services/UpdateCategoryService';
import DeleteCategoryService from '@modules/products/services/DeleteCategoryService';
import ShowCategoryService from '@modules/products/services/ShowCategoryService';

export default class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const restaurant_id = request.restaurant.id;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute({
      restaurant_id,
      name,
      description,
    });

    return response.json(category);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const restaurant_id = request.restaurant.id;

    const listCategories = container.resolve(ListCategoriesService);

    const categories = await listCategories.execute(restaurant_id);

    return response.json(categories);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;
    const restaurant_id = request.restaurant.id;

    const showCategory = container.resolve(ShowCategoryService);

    const category = await showCategory.execute({ category_id, restaurant_id });

    return response.json(category);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;
    const restaurant_id = request.restaurant.id;

    const { name, description } = request.body;

    const updateCategory = container.resolve(UpdateCategoryService);

    const category = await updateCategory.execute({
      category_id,
      restaurant_id,
      name,
      description,
    });

    return response.json(category);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const restaurant_id = request.restaurant.id;
    const { category_id } = request.params;

    const deleteCategory = container.resolve(DeleteCategoryService);

    await deleteCategory.execute({
      restaurant_id,
      category_id,
    });

    return response.status(204).json({ message: 'deleted' });
  }
}
