import { Router } from 'express';

import ensureRestaurantAuthenticated from '@modules/restaurants/infra/http/middlewares/ensureRestaurantAuthenticated';
import TablesController from '../controllers/TablesController';

const tablesRouter = Router();
const tablesController = new TablesController();

tablesRouter.get('/', ensureRestaurantAuthenticated, tablesController.index);
tablesRouter.get(
  '/:table_id',
  ensureRestaurantAuthenticated,
  tablesController.show,
);

tablesRouter.post('/', ensureRestaurantAuthenticated, tablesController.create);

tablesRouter.put(
  '/:table_id',
  ensureRestaurantAuthenticated,
  tablesController.update,
);

tablesRouter.delete(
  '/:table_id',
  ensureRestaurantAuthenticated,
  tablesController.destroy,
);

export default tablesRouter;
