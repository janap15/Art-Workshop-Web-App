import express from 'express';
import { LoginController } from '../controllers/login.controller';

const loginRouter = express.Router();

loginRouter.route('/login').post(
    (req, res) => new LoginController().login(req, res)
)

loginRouter.route('/getUser').post(
    (req, res) => new LoginController().getUser(req, res)
)

export default loginRouter;