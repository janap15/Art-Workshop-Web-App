"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../controllers/users.controller");
const usersRouter = express_1.default.Router();
usersRouter.route('/getUser').post((req, res) => new users_controller_1.UsersController().getUser(req, res));
usersRouter.route('/getAllComments').post((req, res) => new users_controller_1.UsersController().getAllComments(req, res));
usersRouter.route('/removeComment').post((req, res) => new users_controller_1.UsersController().removeComment(req, res));
usersRouter.route('/editComment').post((req, res) => new users_controller_1.UsersController().editComment(req, res));
usersRouter.route('/editUser').post((req, res) => new users_controller_1.UsersController().editUser(req, res));
usersRouter.route('/getImg').post((req, res) => new users_controller_1.UsersController().getImg(req, res));
usersRouter.route('/getAllActiveUsers').get((req, res) => new users_controller_1.UsersController().getAllActiveUsers(req, res));
usersRouter.route('/getRegisterRequests').get((req, res) => new users_controller_1.UsersController().getRegisterRequests(req, res));
usersRouter.route('/approveReq').post((req, res) => new users_controller_1.UsersController().approveReq(req, res));
usersRouter.route('/rejectReq').post((req, res) => new users_controller_1.UsersController().rejectReq(req, res));
usersRouter.route('/setUserType').post((req, res) => new users_controller_1.UsersController().setUserType(req, res));
usersRouter.route('/removeUser').post((req, res) => new users_controller_1.UsersController().removeUser(req, res));
exports.default = usersRouter;
//# sourceMappingURL=users.router.js.map