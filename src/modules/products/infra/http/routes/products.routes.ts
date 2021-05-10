import { Router } from 'express';

import ensureRestaurantAuthenticated from '@modules/restaurants/infra/http/middlewares/ensureRestaurantAuthenticated';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get(
  '/:restaurant_name/:restaurant_id',
  productsController.index,
);

productsRouter.get(
  '/:restaurant_name/:restaurant_id/:product_id',
  productsController.show,
);

productsRouter.post(
  '/',
  ensureRestaurantAuthenticated,
  productsController.create,
);

productsRouter.put(
  '/:restaurant_name/:restaurant_id/:product_id',
  ensureRestaurantAuthenticated,
  productsController.update,
);

export default productsRouter;
