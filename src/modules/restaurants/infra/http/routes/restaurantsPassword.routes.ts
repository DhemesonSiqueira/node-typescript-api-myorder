import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const restaurantPasswordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

restaurantPasswordRouter.post('/forgot', forgotPasswordController.create);
restaurantPasswordRouter.post('/reset', resetPasswordController.create);

export default restaurantPasswordRouter;
