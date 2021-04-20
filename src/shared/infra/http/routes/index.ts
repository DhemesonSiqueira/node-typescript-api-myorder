import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import restaurantsRouter from '@modules/restaurants/infra/http/routes/restaurants.routes';
import restaurantSessionsRouter from '@modules/restaurants/infra/http/routes/restaurantSessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/products', productsRouter);
routes.use('/restaurants', restaurantsRouter);
routes.use('/restaurant-sessions', restaurantSessionsRouter);

export default routes;
