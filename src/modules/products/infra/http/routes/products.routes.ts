import { Router } from 'express';

import ensureRestaurantAuthenticated from '@modules/restaurants/infra/http/middlewares/ensureRestaurantAuthenticated';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/:restaurant_id', productsController.index);

productsRouter.get('/:restaurant_id/:product_id', productsController.show);

productsRouter.post(
  '/',
  ensureRestaurantAuthenticated,
  productsController.create,
);

productsRouter.put(
  '/:product_id',
  ensureRestaurantAuthenticated,
  productsController.update,
);

productsRouter.delete(
  '/:product_id',
  ensureRestaurantAuthenticated,
  productsController.destroy,
);

export default productsRouter;
