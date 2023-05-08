import express from 'express';
import { RegisterController } from '../controllers/register.controller';

const registerRouter = express.Router();

registerRouter.route('/getUser').post(
    (req, res) => new RegisterController().getUser(req, res)
)

registerRouter.route('/register').post(
    (req, res) => new RegisterController().register(req, res)
)

registerRouter.route('/registerWithProfileImg').post(
    (req, res) => new RegisterController().registerWithProfileImg(req, res)
)


export default registerRouter;