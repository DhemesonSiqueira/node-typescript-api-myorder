import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import ListProductsService from '@modules/products/services/ListProductsService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const price = Number(request.body.price);

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
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
}
