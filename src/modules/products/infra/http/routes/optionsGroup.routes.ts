import { Router } from 'express';

import ensureRestaurantAuthenticated from '@modules/restaurants/infra/http/middlewares/ensureRestaurantAuthenticated';
import OptionsGroupController from '../controllers/OptionsGroupController';

const optionsGroupRouter = Router();
const optionsGroupController = new OptionsGroupController();

optionsGroupRouter.get(
  '/',
  ensureRestaurantAuthenticated,
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

export default optionsGroupRouter;
