import express from 'express';
import { PasswordController } from '../controllers/passwordchange.controller';

const passwordRouter = express.Router();

passwordRouter.route('/requestPasswordChange').post(
    (req, res) => new PasswordController().requestPasswordChange(req, res)
);

passwordRouter.route('/passwordChange').post(
    (req, res) => new PasswordController().passwordChange(req, res)
);


passwordRouter.route('/hasActiveToken').post(
    (req, res) => new PasswordController().hasActiveToken(req, res)
);


export default passwordRouter;