"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterController = void 0;
const users_1 = __importDefault(require("../models/users"));
const server_1 = require("../server");
class RegisterController {
    constructor() {
        this.getUser = (req, res) => {
            let username = req.body.username;
            let email = req.body.email;
            users_1.default.findOne({ 'username': username }, (err, user1) => {
                if (err)
                    console.log(err);
                else if (!user1) {
                    users_1.default.findOne({ 'email': email }, (err2, user2) => {
                        if (err2)
                            console.log(err);
                        else
                            res.json(user2);
                    });
                }
                else {
                    res.json(user1);
                }
            });
        };
        this.register = (req, res) => {
            console.log(req.body);
            let user = new users_1.default({
                'username': req.body.username,
                'password': req.body.password,
                'firstname': req.body.firstname,
                'lastname': req.body.lastname,
                'phone': req.body.phone,
                'email': req.body.email,
                'orgName': req.body.orgName,
                'state': req.body.state,
                'city': req.body.city,
                'postNum': req.body.post,
                'street': req.body.street,
                'streetNum': req.body.streetNum,
                'MB': req.body.MB,
                'type': req.body.type,
                'status': req.body.status
            });
            user.save().then(u => {
                res.status(200).json({ 'msg': 'ok' });
            }).catch(err1 => {
                console.log(err1);
                res.status(400).json({ 'msg': 'not ok' });
            });
        };
        this.registerWithProfileImg = (req, res) => {
            console.log(req.body);
            (0, server_1.uploadProfileImages)(req, res, err => {
                var _a, _b;
                console.log((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename);
                if (err)
                    console.log(err);
                else {
                    let user = new users_1.default({
                        'username': req.body.username,
                        'password': req.body.password,
                        'firstname': req.body.firstname,
                        'lastname': req.body.lastname,
                        'phone': req.body.phone,
                        'email': req.body.email,
                        'orgName': req.body.orgName,
                        'state': req.body.state,
                        'city': req.body.city,
                        'postNum': parseInt(req.body.post),
                        'street': req.body.street,
                        'streetNum': req.body.streetNum,
                        'MB': req.body.MB,
                        'type': req.body.type,
                        'status': req.body.status,
                        'profileImg': (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename
                    });
                    user.save().then(u => {
                        res.status(200).json({ 'msg': 'ok' });
                    }).catch(err1 => {
                        res.status(400).json({ 'msg': 'not ok' });
                    });
                }
            });
        };
    }
}
exports.RegisterController = RegisterController;
//# sourceMappingURL=register.controller.js.map