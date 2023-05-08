"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const comment_1 = __importDefault(require("../models/comment"));
const users_1 = __importDefault(require("../models/users"));
const path_1 = __importDefault(require("path"));
const server_1 = require("../server");
class UsersController {
    constructor() {
        this.getUser = (req, res) => {
            users_1.default.findOne({ 'username': req.body.username }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getAllComments = (req, res) => {
            comment_1.default.find({ 'user': req.body.username }, (err, comm) => {
                if (err)
                    console.log(err);
                else {
                    console.log(comm);
                    res.json(comm);
                }
            });
        };
        this.removeComment = (req, res) => {
            comment_1.default.deleteOne({ '_id': req.body.comment._id }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'msg': 'ok' });
            });
        };
        this.editComment = (req, res) => {
            let comm = req.body.comment;
            comment_1.default.updateOne({ '_id': comm._id }, { $set: { 'comment': comm.comment } }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'msg': 'ok' });
            });
        };
        this.editUser = (req, res) => {
            (0, server_1.uploadProfileImages)(req, res, err => {
                var _a;
                if (err)
                    console.log(err);
                else {
                    if (req.file === undefined) {
                        users_1.default.updateOne({ 'username': req.body.username }, { $set: { 'firstname': req.body.firstname, 'lastname': req.body.lastname, 'phone': req.body.phone,
                                'orgName': req.body.orgName, 'MB': req.body.MB,
                                'state': req.body.state, 'city': req.body.city, 'postNum': req.body.postNum,
                                'street': req.body.street, 'streetNum': req.body.streetNum } }, (err2) => {
                            if (err2)
                                console.log(err2);
                            else
                                res.json({ 'msg': 'ok' });
                        });
                    }
                    else {
                        users_1.default.updateOne({ 'username': req.body.username }, { $set: { 'firstname': req.body.firstname, 'lastname': req.body.lastname, 'phone': req.body.phone,
                                'orgName': req.body.orgName, 'MB': req.body.MB, 'profileImg': (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename,
                                'state': req.body.state, 'city': req.body.city, 'postNum': req.body.postNum,
                                'street': req.body.street, 'streetNum': req.body.streetNum } }, (err2) => {
                            if (err2)
                                console.log(err2);
                            else
                                res.json({ 'msg': 'ok' });
                        });
                    }
                }
            });
        };
        this.getImg = (req, res) => {
            let imgPath = path_1.default.join(__dirname, '../../uploadsProfileImages') + '/' + req.body.imageName;
            res.sendFile(imgPath);
        };
        this.getAllActiveUsers = (req, res) => {
            users_1.default.find({ 'status': 'aktivan' }, (err, users) => {
                if (err)
                    console.log(err);
                else {
                    res.json(users);
                }
            });
        };
        this.getRegisterRequests = (req, res) => {
            users_1.default.find({ 'status': 'obrada' }, (err, users) => {
                if (err)
                    console.log(err);
                else {
                    res.json(users);
                }
            });
        };
        this.approveReq = (req, res) => {
            users_1.default.updateOne({ 'username': req.body.username }, { $set: { 'status': 'aktivan' } }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'msg': 'ok' });
            });
        };
        this.rejectReq = (req, res) => {
            users_1.default.updateOne({ 'username': req.body.username }, { $set: { 'status': 'neaktivan' } }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'msg': 'ok' });
            });
        };
        this.setUserType = (req, res) => {
            users_1.default.updateOne({ 'username': req.body.username }, { $set: { 'type': req.body.type } }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'msg': 'ok' });
            });
        };
        this.removeUser = (req, res) => {
            users_1.default.updateOne({ 'username': req.body.username }, { $set: { 'status': 'neaktivan', 'profileImg': 'avatar-icon.png' } }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'msg': 'ok' });
            });
        };
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map