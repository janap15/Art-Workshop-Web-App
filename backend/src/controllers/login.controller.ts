import * as express from 'express';
import Users from '../models/users';

export class LoginController{

    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        Users.findOne({'username' : username, 'password' : password, 'status' : 'aktivan'}, (err, user) => {
            if (err) console.log(err);
            else res.json(user);
        })
    }

    getUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        console.log(username)
        Users.findOne({'username' : username}, (err, user) => {
            if (err) console.log(err);
            else res.json(user);
        })
    }
}