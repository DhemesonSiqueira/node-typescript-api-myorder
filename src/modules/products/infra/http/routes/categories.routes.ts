import { Router } from 'express';

import ensureRestaurantAuthenticated from '@modules/restaurants/infra/http/middlewares/ensureRestaurantAuthenticated';
import CategoriesController from '../controllers/CategoriesController';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.post(
  '/',
  ensureRestaurantAuthenticated,
  categoriesController.create,
);
categoriesRouter.get(
  '/',
  ensureRestaurantAuthenticated,
  categoriesController.index,
);

export default categoriesRouter;
