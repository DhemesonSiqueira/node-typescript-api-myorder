import { Router } from 'express';
import RestaurantSessionsController from '../controllers/RestaurantSessionsController';

const restaurantSessionsRouter = Router();
const restaurantSessionsController = new RestaurantSessionsController();

restaurantSessionsRouter.post('/', restaurantSessionsController.create);

export default restaurantSessionsRouter;
