"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_controller_1 = require("../controllers/login.controller");
const loginRouter = express_1.default.Router();
loginRouter.route('/login').post((req, res) => new login_controller_1.LoginController().login(req, res));
loginRouter.route('/getUser').post((req, res) => new login_controller_1.LoginController().getUser(req, res));
exports.default = loginRouter;
//# sourceMappingURL=login.router.js.map