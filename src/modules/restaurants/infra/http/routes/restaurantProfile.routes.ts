import { Router } from 'express';

import RestaurantProfileController from '../controllers/RestaurantProfileController';

import ensureRestaurantAuthenticated from '../middlewares/ensureRestaurantAuthenticated';

const restaurantProfileRouter = Router();
const restaurantProfileController = new RestaurantProfileController();

restaurantProfileRouter.use(ensureRestaurantAuthenticated);

restaurantProfileRouter.get('/', restaurantProfileController.show);
restaurantProfileRouter.put('/', restaurantProfileController.update);

export default restaurantProfileRouter;
