import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import RestaurantsController from '../controllers/RestaurantsController';
import RestaurantImageController from '../controllers/RestaurantImageController';

import ensureRestaurantAuthenticated from '../middlewares/ensureRestaurantAuthenticated';

const restaurantsRouter = Router();
const restaurantsController = new RestaurantsController();
const restaurantImageController = new RestaurantImageController();
const upload = multer(uploadConfig);

restaurantsRouter.get('/', restaurantsController.index);
restaurantsRouter.post('/', restaurantsController.create);

restaurantsRouter.patch(
  '/image',
  ensureRestaurantAuthenticated,
  upload.single('image'),
  restaurantImageController.create,
);

export default restaurantsRouter;
