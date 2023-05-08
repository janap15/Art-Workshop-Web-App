import express from 'express';
import { UsersController } from '../controllers/users.controller';

const usersRouter = express.Router();

usersRouter.route('/getUser').post(
    (req, res) => new UsersController().getUser(req, res)
)

usersRouter.route('/getAllComments').post(
    (req, res) => new UsersController().getAllComments(req, res)
)

usersRouter.route('/removeComment').post(
    (req, res) => new UsersController().removeComment(req, res)
)

usersRouter.route('/editComment').post(
    (req, res) => new UsersController().editComment(req, res)
)

usersRouter.route('/editUser').post(
    (req, res) => new UsersController().editUser(req, res)
)

usersRouter.route('/getImg').post(
    (req, res) => new UsersController().getImg(req, res)
)

usersRouter.route('/getAllActiveUsers').get(
    (req, res) => new UsersController().getAllActiveUsers(req, res)
)

usersRouter.route('/getRegisterRequests').get(
    (req, res) => new UsersController().getRegisterRequests(req, res)
)

usersRouter.route('/approveReq').post(
    (req, res) => new UsersController().approveReq(req, res)
)

usersRouter.route('/rejectReq').post(
    (req, res) => new UsersController().rejectReq(req, res)
)

usersRouter.route('/setUserType').post(
    (req, res) => new UsersController().setUserType(req, res)
)

usersRouter.route('/removeUser').post(
    (req, res) => new UsersController().removeUser(req, res)
)


export default usersRouter;