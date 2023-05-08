import * as express from 'express';
import path from 'path';
import Messages from '../models/messages';
import Comment from '../models/comment';
import workshop from '../models/workshop';
import Workshop from '../models/workshop';
import {uploadMainImages} from '../server';
import {uploadGalleryImages} from '../server';

export class WorkshopController{

    getAllWorkshops = (req: express.Request, res: express.Response) => {
        Workshop.find({}, (err, workshops) => {
            if (err) console.log(err);
            else res.json(workshops);
        })
    }

    getAllAcceptedWorkshops = (req: express.Request, res: express.Response) => {
        Workshop.find({'status' : 'odobrena'}, (err, workshops) => {
            if (err) console.log(err);
            else res.json(workshops);
        })
    }

    getAllRequestedWorkshops = (req: express.Request, res: express.Response) => {
        Workshop.find({'status' : {$in :['ucesnik_zahtev', 'organizator_zahtev']}}, (err, workshops) => {
            if (err) console.log(err);
            else res.json(workshops);
        })
    }

    getAllWorkshopsOfUser = (req: express.Request, res: express.Response) => {
        Workshop.find({'accepted' : {'$in' : [req.body.username]}}, (err, workshops) => {
            if (err) console.log(err);
            else res.json(workshops);
        })
    }


    getAllWorkshopsOfOrganizer = (req: express.Request, res: express.Response) => {
        Workshop.find({'organizer' : req.body.organizer, 'status' : 'odobrena'}, (err, workshops) => {
            if (err) console.log(err);
            else res.json(workshops);
        })
    }

    getAllWorkshopsOfParticipantPending = (req: express.Request, res: express.Response) => {
        Workshop.find({'pending' : {'$in' : [req.body.username]}}, (err, workshops) => {
            if (err) console.log(err);
            else res.json(workshops);
        })
    }

    getAllLikedWorkshops = (req: express.Request, res: express.Response) => {
        Workshop.find({'likes' : {'$in' : [req.body.username]}}, (err, workshops) => {
            if (err) console.log(err);
            else res.json(workshops);
        })
    }

    removeLike = (req: express.Request, res: express.Response) => {
        Workshop.findOneAndUpdate({'_id' : req.body._id}, 
            { $pull : {'likes' : req.body.username}}, (err) => {
            if (err) console.log(err);
            else res.json({'msg' : 'ok'});
        })
    }

    getWorkshop = (req: express.Request, res: express.Response) => {
        Workshop.findOne({'_id' : req.body._id}, (err, shop) => {
            if (err) console.log(err);
            else res.json(shop);
        })
    }

    removeFromAccepted = (req: express.Request, res: express.Response) => {
        console.log(workshop);
        Workshop.findOneAndUpdate({'_id' : req.body.workshop._id}, 
            { $pull : {'accepted' : req.body.username}, $inc : {'number_left' : 1}}, (err) => {
            if (err) console.log(err);
            else res.json({'msg' : 'ok'});
        })
    }

    addToWaiting = (req: express.Request, res: express.Response) => {
        Workshop.findOneAndUpdate({'_id' : req.body._id}, 
            { $push : {'waiting' : req.body.username}}, (err) => {
            if (err) console.log(err);
            else res.json({'msg' : 'ok'});
        })
    }

    addToPending = (req: express.Request, res: express.Response) => {
        Workshop.findOneAndUpdate({'_id' : req.body._id}, 
            { $push : {'pending' : req.body.username}, $inc : {'number_left' : -1}}, (err) => {
            if (err) console.log(err);
            else res.json({'msg' : 'ok'});
        })
    }

    addLike = (req: express.Request, res: express.Response) => {
        Workshop.findOneAndUpdate({'_id' : req.body._id}, 
            { $push : {'likes' : req.body.username}}, (err) => {
            if (err) console.log(err);
            else res.json({'msg' : 'ok'});
        })
    }

    getComment = (req: express.Request, res: express.Response) => {
        Comment.findOne({'_id' : req.body._id}, (err, comm) => {
            if (err) console.log(err);
            else res.json(comm);
        })
    }

    addComment = (req: express.Request, res: express.Response) => {
        let comment = new Comment({
            'workshop' : req.body.workshop._id,
            'title' : req.body.workshop.title, 
            'user' : req.body.username,
            'comment' : req.body.comment,
            'timestamp' : new Date()
        });

        comment.save().then(c => {
            Workshop.findOneAndUpdate({'_id' : req.body.workshop._id}, 
                { $push : {'comments' : comment._id}}, (err) => {
                if (err) console.log(err);
                else res.json({'msg' : 'ok'});
            })
        }).catch(err2 => {
            res.status(400).json({'msg' : 'not ok'})
        })
    }

    requestToAddWorkshop = (req: express.Request, res: express.Response) => {
        uploadGalleryImages(req, res, err => {
            if (err) console.log(err);
            else {
                console.log(req.files.length);
                let gallery = [];
                if (req.files != null){
                    var fileKeys = Object.keys(req.files);
                    fileKeys.forEach(function(key) {
                        gallery.push(req.files[key].filename);
                    });
                }
                let photoToSave;
                let galleryToSave;

                if (!req.body.existingPhoto)
                {
                    photoToSave = gallery[0];
                    if (gallery.length == 1){
                        galleryToSave = [];
                        
                    }
                    else {
                        galleryToSave = gallery.slice(1);
                    }
                }
                else{
                    photoToSave = req.body.existingPhoto;
                    if (gallery.length == 0){
                        galleryToSave = [];
                    }
                    else{
                        galleryToSave = gallery;
                    }
                }
                if (req.body.existingGallery)
                    galleryToSave = req.body.existingGallery.concat(galleryToSave);
             
                let workshop = new Workshop({
                    'title' : req.body.title,
                    'organizer' : req.body.organizer,
                    'photo' : photoToSave,
                    'gallery' : galleryToSave,
                    'address' : req.body.address,
                    'description_short' : req.body.description_short,
                    'description_long' : req.body.description_long,
                    'number_participants' : req.body.number_participants,
                    'status' : req.body.status,
                    'date' : req.body.date,
                    'pending' : [],
                    'likes' : [],
                    'comments' : [],
                    'waiting' : [],
                    'number_left' : 0
                })
                workshop.save().then(w =>{
                    res.status(200).json({'msg' : 'ok'})
                }).catch(err => {
                    res.status(400).json({'msg' : 'not ok'})
                })
            }
        })
    }

    editWorkshop = (req: express.Request, res: express.Response) => {
        uploadGalleryImages(req, res, err => {
            if (err) console.log(err);
            else {
                console.log(req.files.length);
                let gallery = [];
                if (req.files != null){
                    var fileKeys = Object.keys(req.files);
                    fileKeys.forEach(function(key) {
                        gallery.push(req.files[key].filename);
                    });
                }
                let photoToSave;
                let galleryToSave;

                if (!req.body.existingPhoto)
                {
                    photoToSave = gallery[0];
                    if (gallery.length == 1){
                        galleryToSave = [];
                        
                    }
                    else {
                        galleryToSave = gallery.slice(1);
                    }
                }
                else{
                    photoToSave = req.body.existingPhoto;
                    if (gallery.length == 0){
                        galleryToSave = [];
                    }
                    else{
                        galleryToSave = gallery;
                    }
                }
                if (req.body.existingGallery)
                    galleryToSave = req.body.existingGallery.concat(galleryToSave);

                Workshop.findOneAndUpdate({'_id' : req.body._id}, 
                {$set : { 'title' : req.body.title,
                        'photo' : photoToSave,
                        'gallery' : galleryToSave,
                        'address' : req.body.address,
                        'description_short' : req.body.description_short,
                        'description_long' : req.body.description_long,
                        'number_participants' : req.body.number_participants,
                        'status' : req.body.status,
                        'date' : req.body.date,}}, (err) => {
                    if (err) console.log(err);
                    else {
                        Messages.updateMany({'workshop' : req.body._id}, {$set : {'title' : req.body.title}}, (err1) => {
                            if (err1) console.log(err1);
                            else {
                                Comment.updateMany({'workshop' : req.body._id}, {$set : {'title' : req.body.title}}, (err2) => {
                                    if (err2) console.log(err2);
                                    else  res.json({'msg' : 'ok'});
                                })
                            }
                        })
                    }
                })
            }
        })
    }

    getPhoto = (req: express.Request, res: express.Response) => {
        let imgPath = path.join(__dirname, '../../uploadsWorkshopImages') + '/' + req.body.photoName;
        res.sendFile(imgPath);
    }

    editWorkshopStatus = (req: express.Request, res: express.Response) => {
        Workshop.findOneAndUpdate({'_id' : req.body._id}, 
            { $set : {'status' : req.body.status}}, (err) => {
            if (err) console.log(err);
            else res.json({'msg' : 'ok'});
        })
    }

    addToAccepted = (req: express.Request, res: express.Response) => {
        console.log(req.body);
        Workshop.findOneAndUpdate({'_id' : req.body._id}, 
                { $push : {'accepted' : req.body.username}}, (err) => {
                if (err) console.log(err);
                else res.json({'msg' : 'ok'});
            })
    }

    removeFromPending = (req: express.Request, res: express.Response) => {
        Workshop.findOneAndUpdate({'_id' : req.body._id}, 
            { $pull : {'pending' : req.body.username}}, (err) => {
            if (err) console.log(err);
            else res.json({'msg' : 'ok'});
        })
    }

    removeWorkshop = (req: express.Request, res: express.Response) => {
        Workshop.findOneAndUpdate({'_id' : req.body._id}, { $set : {'status' : 'obrisana'}}, (err) => {
            if (err) console.log(err);
            else res.json({'msg' : 'ok'});
        })
    }
    
}