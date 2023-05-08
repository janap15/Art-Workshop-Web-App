"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passwordchange_controller_1 = require("../controllers/passwordchange.controller");
const passwordRouter = express_1.default.Router();
passwordRouter.route('/requestPasswordChange').post((req, res) => new passwordchange_controller_1.PasswordController().requestPasswordChange(req, res));
passwordRouter.route('/passwordChange').post((req, res) => new passwordchange_controller_1.PasswordController().passwordChange(req, res));
passwordRouter.route('/hasActiveToken').post((req, res) => new passwordchange_controller_1.PasswordController().hasActiveToken(req, res));
exports.default = passwordRouter;
//# sourceMappingURL=passwordchange.route.js.map