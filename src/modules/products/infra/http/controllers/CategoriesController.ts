import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategoryService from '@modules/products/services/CreateCategoryService';
import ListCategoriesService from '@modules/products/services/ListCategoriesService';

export default class ProductsController {
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
    const { restaurant_id } = request.params;

    const listCategories = container.resolve(ListCategoriesService);

    const categories = await listCategories.execute(restaurant_id);

    return response.json(categories);
  }

  // public async show(request: Request, response: Response): Promise<Response> {
  //   const { product_id } = request.params;

  //   const showProduct = container.resolve(ShowProductService);

  //   const product = await showProduct.execute({ product_id });

  //   return response.json(product);
  // }

  // public async update(request: Request, response: Response): Promise<Response> {
  //   const { product_id } = request.params;
  //   const restaurant_id = request.restaurant.id;

  //   const { name, description, price } = request.body;

  //   const updateProduct = container.resolve(UpdateProductService);

  //   const product = await updateProduct.execute({
  //     restaurant_id,
  //     product_id,
  //     name,
  //     description,
  //     price,
  //   });

  //   return response.json(product);
  // }
}
