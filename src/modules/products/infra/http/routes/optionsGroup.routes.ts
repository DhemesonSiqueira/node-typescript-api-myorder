import { Router } from 'express';

import ensureRestaurantAuthenticated from '@modules/restaurants/infra/http/middlewares/ensureRestaurantAuthenticated';
import OptionsGroupController from '../controllers/OptionsGroupController';
import OptionsController from '../controllers/OptionsController';

const optionsGroupRouter = Router();
const optionsGroupController = new OptionsGroupController();
const optionsController = new OptionsController();

optionsGroupRouter.get(
  '/:restaurant_id/:product_id',
  optionsGroupController.index,
);

optionsGroupRouter.get(
  '/:group_id',
  ensureRestaurantAuthenticated,
  optionsGroupController.show,
);

optionsGroupRouter.post(
  '/',
  ensureRestaurantAuthenticated,
  optionsGroupController.create,
);

optionsGroupRouter.put(
  '/:group_id',
  ensureRestaurantAuthenticated,
  optionsGroupController.update,
);

optionsGroupRouter.delete(
  '/:group_id',
  ensureRestaurantAuthenticated,
  optionsGroupController.destroy,
);

// Rotas das opções
optionsGroupRouter.post(
  '/options',
  ensureRestaurantAuthenticated,
  optionsController.create,
);

optionsGroupRouter.put(
  '/options/:option_id',
  ensureRestaurantAuthenticated,
  optionsController.update,
);

optionsGroupRouter.delete(
  '/options/:option_id',
  ensureRestaurantAuthenticated,
  optionsController.destroy,
);

export default optionsGroupRouter;
