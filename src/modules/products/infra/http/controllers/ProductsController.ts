import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import ListProductsService from '@modules/products/services/ListProductsService';
import ShowProductService from '@modules/products/services/ShowProductService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, price } = request.body;
    const restaurant_id = request.restaurant.id;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      restaurant_id,
      name,
      description,
      price,
    });

    return response.json(product);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductsService);

    const products = await listProducts.execute();

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;

    const showProduct = container.resolve(ShowProductService);

    const product = await showProduct.execute({ product_id });

    return response.json(product);
  }
}
