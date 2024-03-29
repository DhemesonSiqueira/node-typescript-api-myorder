import { Router } from 'express';

import ensureRestaurantAuthenticated from '@modules/restaurants/infra/http/middlewares/ensureRestaurantAuthenticated';
import AddressController from '../controllers/AddressController';

const addressRouter = Router();
const addressController = new AddressController();

addressRouter.get('/:restaurant_id', addressController.show);

addressRouter.post(
  '/',
  ensureRestaurantAuthenticated,
  addressController.create,
);

addressRouter.put('/', ensureRestaurantAuthenticated, addressController.update);

addressRouter.delete(
  '/:address_id',
  ensureRestaurantAuthenticated,
  addressController.destroy,
);

export default addressRouter;
