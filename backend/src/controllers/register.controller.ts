import * as express from 'express';
import Users from '../models/users';
import { uploadProfileImages } from '../server';

export class RegisterController{

    getUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let email = req.body.email;

        Users.findOne({'username' : username}, (err, user1) => {
            if (err) console.log(err);
            else if (!user1){
                Users.findOne({'email' : email}, (err2, user2) =>{
                    if (err2) console.log(err);
                    else res.json(user2);
                })
            }
            else {
                res.json(user1);
            }
        })
    }

    register = (req: express.Request, res: express.Response) => {
        console.log(req.body);
        let user = new Users({
            'username' : req.body.username,
            'password' : req.body.password,
            'firstname' : req.body.firstname,
            'lastname' :  req.body.lastname,
            'phone' : req.body.phone,
            'email' : req.body.email,
            'orgName' : req.body.orgName,
            'state' : req.body.state,
            'city' : req.body.city,
            'postNum' : req.body.post,
            'street' : req.body.street,
            'streetNum' : req.body.streetNum,
            'MB' : req.body.MB,
            'type' : req.body.type,
            'status' : req.body.status
        });

        user.save().then(u => {
            res.status(200).json({'msg' : 'ok'});
        }).catch(err1 => {
            console.log(err1);
            res.status(400).json({'msg' : 'not ok'});
        })
   
    }

    registerWithProfileImg = (req: express.Request, res: express.Response) => {
        console.log(req.body);
        uploadProfileImages(req, res, err => {
            console.log(req.file?.filename);
            if (err) console.log(err);
            else {
                let user = new Users({
                    'username' : req.body.username,
                    'password' : req.body.password,
                    'firstname' : req.body.firstname,
                    'lastname' :  req.body.lastname,
                    'phone' : req.body.phone,
                    'email' : req.body.email,
                    'orgName' : req.body.orgName,
                    'state' : req.body.state,
                    'city' : req.body.city,
                    'postNum' : parseInt(req.body.post),
                    'street' : req.body.street,
                    'streetNum' : req.body.streetNum,
                    'MB' : req.body.MB,
                    'type' : req.body.type,
                    'status' : req.body.status,
                    'profileImg' : req.file?.filename
                });
        
                user.save().then(u => {
                    res.status(200).json({'msg' : 'ok'});
                }).catch(err1 => {
                    res.status(400).json({'msg' : 'not ok'});
                })
            }
                       
        })
    }
            
}