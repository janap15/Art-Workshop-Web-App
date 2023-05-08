"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_controller_1 = require("../controllers/register.controller");
const registerRouter = express_1.default.Router();
registerRouter.route('/getUser').post((req, res) => new register_controller_1.RegisterController().getUser(req, res));
registerRouter.route('/register').post((req, res) => new register_controller_1.RegisterController().register(req, res));
registerRouter.route('/registerWithProfileImg').post((req, res) => new register_controller_1.RegisterController().registerWithProfileImg(req, res));
exports.default = registerRouter;
//# sourceMappingURL=register.router.js.map