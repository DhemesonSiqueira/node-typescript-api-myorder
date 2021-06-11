import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import restaurantsRouter from '@modules/restaurants/infra/http/routes/restaurants.routes';
import restaurantSessionsRouter from '@modules/restaurants/infra/http/routes/restaurantSessions.routes';
import restaurantPasswordRouter from '@modules/restaurants/infra/http/routes/restaurantsPassword.routes';
import restaurantProfileRouter from '@modules/restaurants/infra/http/routes/restaurantProfile.routes';
import categoriesRouter from '@modules/products/infra/http/routes/categories.routes';
import tablesRouter from '@modules/restaurants/infra/http/routes/tables.routes';
import addressRouter from '@modules/restaurants/infra/http/routes/address.routes';
import optionsGroupRouter from '@modules/products/infra/http/routes/optionsGroup.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/products', productsRouter);
routes.use('/categories', categoriesRouter);
routes.use('/options-group', optionsGroupRouter);
routes.use('/tables', tablesRouter);
routes.use('/restaurants', restaurantsRouter);
routes.use('/address', addressRouter);
routes.use('/restaurant-profile', restaurantProfileRouter);
routes.use('/restaurant-sessions', restaurantSessionsRouter);
routes.use('/restaurant-password', restaurantPasswordRouter);

export default routes;
