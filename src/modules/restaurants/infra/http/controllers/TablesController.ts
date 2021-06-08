import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTableService from '@modules/restaurants/services/CreateTableService';
import ListTablesService from '@modules/restaurants/services/ListTablesService';
import UpdateTableService from '@modules/restaurants/services/UpdateTableService';
import DeleteTableService from '@modules/restaurants/services/DeleteTableService';
import ShowTableService from '@modules/restaurants/services/ShowTableService';

export default class TablesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { number, description } = request.body;
    const restaurant_id = request.restaurant.id;

    const createTable = container.resolve(CreateTableService);

    const table = await createTable.execute({
      restaurant_id,
      number,
      description,
    });

    return response.json(table);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const restaurant_id = request.restaurant.id;

    const listTables = container.resolve(ListTablesService);

    const tables = await listTables.execute(restaurant_id);

    return response.json(tables);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { table_id } = request.params;
    const restaurant_id = request.restaurant.id;

    const showTable = container.resolve(ShowTableService);

    const table = await showTable.execute({ table_id, restaurant_id });

    return response.json(table);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { table_id } = request.params;
    const restaurant_id = request.restaurant.id;

    const { number, description } = request.body;

    const updateTable = container.resolve(UpdateTableService);

    const table = await updateTable.execute({
      table_id,
      restaurant_id,
      number,
      description,
    });

    return response.json(table);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const restaurant_id = request.restaurant.id;
    const { table_id } = request.params;

    const deleteTable = container.resolve(DeleteTableService);

    await deleteTable.execute({
      restaurant_id,
      table_id,
    });

    return response.status(204).json({ message: 'deleted' });
  }
}
