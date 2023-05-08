"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sendemailsworkshop_controller_1 = require("../controllers/sendemailsworkshop.controller");
const sendEmailsRouter = express_1.default.Router();
sendEmailsRouter.route('/canceledWorkshop').post((req, res) => new sendemailsworkshop_controller_1.SendEmailsWorkshopController().canceledWorkshop(req, res));
sendEmailsRouter.route('/hasCapacity').post((req, res) => new sendemailsworkshop_controller_1.SendEmailsWorkshopController().hasCapacity(req, res));
exports.default = sendEmailsRouter;
//# sourceMappingURL=sendemailsworkshop.router.js.map