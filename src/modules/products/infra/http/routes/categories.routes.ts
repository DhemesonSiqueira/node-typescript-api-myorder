import { Router } from 'express';

import ensureRestaurantAuthenticated from '@modules/restaurants/infra/http/middlewares/ensureRestaurantAuthenticated';
import CategoriesController from '../controllers/CategoriesController';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.get(
  '/',
  ensureRestaurantAuthenticated,
  categoriesController.index,
);

categoriesRouter.get(
  '/:category_id',
  ensureRestaurantAuthenticated,
  categoriesController.show,
);

categoriesRouter.post(
  '/',
  ensureRestaurantAuthenticated,
  categoriesController.create,
);

categoriesRouter.put(
  '/:category_id',
  ensureRestaurantAuthenticated,
  categoriesController.update,
);

categoriesRouter.delete(
  '/:category_id',
  ensureRestaurantAuthenticated,
  categoriesController.destroy,
);

export default categoriesRouter;
