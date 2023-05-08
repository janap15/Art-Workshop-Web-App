import * as express from 'express';
import Comment from '../models/comment';
import Users from '../models/users';
import path from 'path';
import { uploadProfileImages } from '../server';
import Messages from '../models/messages';
import Workshop from '../models/workshop';

export class UsersController{

    getUser = (req: express.Request, res: express.Response) => {
        Users.findOne({'username' : req.body.username}, (err, user) => {
            if (err) console.log(err);
            else res.json(user);
        })
    }

    getAllComments = (req: express.Request, res: express.Response) => {
        Comment.find({'user' : req.body.username}, (err, comm) => {
            if (err) console.log(err);
            else {
                console.log(comm);
                res.json(comm);
            }
        })
    } 

    removeComment = (req: express.Request, res: express.Response) => {
        Comment.deleteOne({'_id' : req.body.comment._id}, (err) => {
            if (err) console.log(err);
            else res.json({'msg' : 'ok'});
        })
    } 

    editComment = (req: express.Request, res: express.Response) => {
        let comm = req.body.comment;
        Comment.updateOne({'_id' : comm._id}, {$set : {'comment' : comm.comment}}, (err) => {
            if (err) console.log(err);
            else res.json({'msg' : 'ok'});
        })
    } 

    editUser = (req: express.Request, res: express.Response) => {
        uploadProfileImages(req, res, err => {
            if (err) console.log(err);
            else {
            if (req.file === undefined) {
                Users.updateOne({'username' : req.body.username}, {$set : 
                    {'firstname' : req.body.firstname, 'lastname' : req.body.lastname, 'phone' : req.body.phone,
                    'orgName' : req.body.orgName, 'MB' : req.body.MB,
                    'state' : req.body.state, 'city' : req.body.city, 'postNum' : req.body.postNum, 
                    'street' : req.body.street, 'streetNum' : req.body.streetNum}}, (err2) => {
                    if (err2) console.log(err2);
                    else res.json({'msg' : 'ok'});
                    })
                }
                else {
                    Users.updateOne({'username' : req.body.username}, {$set : 
                        {'firstname' : req.body.firstname, 'lastname' : req.body.lastname, 'phone' : req.body.phone,
                        'orgName' : req.body.orgName, 'MB' : req.body.MB, 'profileImg' : req.file?.filename,
                        'state' : req.body.state, 'city' : req.body.city, 'postNum' : req.body.postNum, 
                        'street' : req.body.street, 'streetNum' : req.body.streetNum}}, (err2) => {
                        if (err2) console.log(err2);
                        else res.json({'msg' : 'ok'});
                        })
                    }
                }
            })
    } 

    getImg = (req: express.Request, res: express.Response) => {
        let imgPath = path.join(__dirname, '../../uploadsProfileImages') + '/' + req.body.imageName;
        res.sendFile(imgPath);
    }
    
    getAllActiveUsers = (req: express.Request, res: express.Response) => {
        Users.find({'status' : 'aktivan'}, (err, users) => {
            if (err) console.log(err);
            else {
                res.json(users);
            }
        })
    }

    getRegisterRequests = (req: express.Request, res: express.Response) => {
        Users.find({'status' : 'obrada'}, (err, users) => {
            if (err) console.log(err);
            else {
                res.json(users);
            }
        })
    }

    approveReq = (req: express.Request, res: express.Response) => {
        Users.updateOne({'username' : req.body.username}, {$set : {'status' : 'aktivan'}}, (err) => {
            if (err) console.log(err);
            else res.json({'msg' : 'ok'});
        })
    }

    rejectReq = (req: express.Request, res: express.Response) => {
        Users.updateOne({'username' : req.body.username}, {$set : {'status' : 'neaktivan'}}, (err) => {
            if (err) console.log(err);
            else res.json({'msg' : 'ok'});
        })
    }

    setUserType = (req: express.Request, res: express.Response) => {
        Users.updateOne({'username' : req.body.username}, {$set : {'type' : req.body.type}}, (err) => {
            if (err) console.log(err);
            else res.json({'msg' : 'ok'});
        })
    }

    removeUser = (req: express.Request, res: express.Response) => {
        Users.updateOne({'username' : req.body.username}, {$set : {'status' : 'neaktivan', 'profileImg' : 'avatar-icon.png'}}, (err) => {
            if (err) console.log(err);
            else res.json({'msg' : 'ok'});
        })
    }
}