import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import ListProductsService from '@modules/products/services/ListProductsService';
import ShowProductService from '@modules/products/services/ShowProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const restaurant_id = request.restaurant.id;
    const { name, description, category_id, price } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      restaurant_id,
      name,
      description,
      category_id,
      price,
    });

    return response.json(product);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { restaurant_id } = request.params;
    const listProducts = container.resolve(ListProductsService);

    const products = await listProducts.execute(restaurant_id);

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { restaurant_id, product_id } = request.params;

    const showProduct = container.resolve(ShowProductService);

    const product = await showProduct.execute({ restaurant_id, product_id });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;
    const restaurant_id = request.restaurant.id;

    const { name, description, price, category_id } = request.body;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
      restaurant_id,
      product_id,
      category_id,
      name,
      description,
      price,
    });

    return response.json(product);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const restaurant_id = request.restaurant.id;
    const { product_id } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute({
      restaurant_id,
      product_id,
    });

    return response.status(204).json({ message: 'deleted' });
  }
}
