import express from 'express';
import { SendEmailsWorkshopController } from '../controllers/sendemailsworkshop.controller';

const sendEmailsRouter = express.Router();

sendEmailsRouter.route('/canceledWorkshop').post(
    (req, res) => new SendEmailsWorkshopController().canceledWorkshop(req, res)
);

sendEmailsRouter.route('/hasCapacity').post(
    (req, res) => new SendEmailsWorkshopController().hasCapacity(req, res)
);

export default sendEmailsRouter;