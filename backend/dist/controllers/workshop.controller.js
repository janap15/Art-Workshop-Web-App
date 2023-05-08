"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopController = void 0;
const path_1 = __importDefault(require("path"));
const messages_1 = __importDefault(require("../models/messages"));
const comment_1 = __importDefault(require("../models/comment"));
const workshop_1 = __importDefault(require("../models/workshop"));
const workshop_2 = __importDefault(require("../models/workshop"));
const server_1 = require("../server");
class WorkshopController {
    constructor() {
        this.getAllWorkshops = (req, res) => {
            workshop_2.default.find({}, (err, workshops) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshops);
            });
        };
        this.getAllAcceptedWorkshops = (req, res) => {
            workshop_2.default.find({ 'status': 'odobrena' }, (err, workshops) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshops);
            });
        };
        this.getAllRequestedWorkshops = (req, res) => {
            workshop_2.default.find({ 'status': { $in: ['ucesnik_zahtev', 'organizator_zahtev'] } }, (err, workshops) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshops);
            });
        };
        this.getAllWorkshopsOfUser = (req, res) => {
            workshop_2.default.find({ 'accepted': { '$in': [req.body.username] } }, (err, workshops) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshops);
            });
        };
        this.getAllWorkshopsOfOrganizer = (req, res) => {
            workshop_2.default.find({ 'organizer': req.body.organizer, 'status': 'odobrena' }, (err, workshops) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshops);
            });
        };
        this.getAllWorkshopsOfParticipantPending = (req, res) => {
            workshop_2.default.find({ 'pending': { '$in': [req.body.username] } }, (err, workshops) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshops);
            });
        };
        this.getAllLikedWorkshops = (req, res) => {
            workshop_2.default.find({ 'likes': { '$in': [req.body.username] } }, (err, workshops) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshops);
            });
        };
        this.removeLike = (req, res) => {
            workshop_2.default.findOneAndUpdate({ '_id': req.body._id }, { $pull: { 'likes': req.body.username } }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'msg': 'ok' });
            });
        };
        this.getWorkshop = (req, res) => {
            workshop_2.default.findOne({ '_id': req.body._id }, (err, shop) => {
                if (err)
                    console.log(err);
                else
                    res.json(shop);
            });
        };
        this.removeFromAccepted = (req, res) => {
            console.log(workshop_1.default);
            workshop_2.default.findOneAndUpdate({ '_id': req.body.workshop._id }, { $pull: { 'accepted': req.body.username }, $inc: { 'number_left': 1 } }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'msg': 'ok' });
            });
        };
        this.addToWaiting = (req, res) => {
            workshop_2.default.findOneAndUpdate({ '_id': req.body._id }, { $push: { 'waiting': req.body.username } }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'msg': 'ok' });
            });
        };
        this.addToPending = (req, res) => {
            workshop_2.default.findOneAndUpdate({ '_id': req.body._id }, { $push: { 'pending': req.body.username }, $inc: { 'number_left': -1 } }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'msg': 'ok' });
            });
        };
        this.addLike = (req, res) => {
            workshop_2.default.findOneAndUpdate({ '_id': req.body._id }, { $push: { 'likes': req.body.username } }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'msg': 'ok' });
            });
        };
        this.getComment = (req, res) => {
            comment_1.default.findOne({ '_id': req.body._id }, (err, comm) => {
                if (err)
                    console.log(err);
                else
                    res.json(comm);
            });
        };
        this.addComment = (req, res) => {
            let comment = new comment_1.default({
                'workshop': req.body.workshop._id,
                'title': req.body.workshop.title,
                'user': req.body.username,
                'comment': req.body.comment,
                'timestamp': new Date()
            });
            comment.save().then(c => {
                workshop_2.default.findOneAndUpdate({ '_id': req.body.workshop._id }, { $push: { 'comments': comment._id } }, (err) => {
                    if (err)
                        console.log(err);
                    else
                        res.json({ 'msg': 'ok' });
                });
            }).catch(err2 => {
                res.status(400).json({ 'msg': 'not ok' });
            });
        };
        this.requestToAddWorkshop = (req, res) => {
            (0, server_1.uploadGalleryImages)(req, res, err => {
                if (err)
                    console.log(err);
                else {
                    console.log(req.files.length);
                    let gallery = [];
                    if (req.files != null) {
                        var fileKeys = Object.keys(req.files);
                        fileKeys.forEach(function (key) {
                            gallery.push(req.files[key].filename);
                        });
                    }
                    let photoToSave;
                    let galleryToSave;
                    if (!req.body.existingPhoto) {
                        photoToSave = gallery[0];
                        if (gallery.length == 1) {
                            galleryToSave = [];
                        }
                        else {
                            galleryToSave = gallery.slice(1);
                        }
                    }
                    else {
                        photoToSave = req.body.existingPhoto;
                        if (gallery.length == 0) {
                            galleryToSave = [];
                        }
                        else {
                            galleryToSave = gallery;
                        }
                    }
                    if (req.body.existingGallery)
                        galleryToSave = req.body.existingGallery.concat(galleryToSave);
                    let workshop = new workshop_2.default({
                        'title': req.body.title,
                        'organizer': req.body.organizer,
                        'photo': photoToSave,
                        'gallery': galleryToSave,
                        'address': req.body.address,
                        'description_short': req.body.description_short,
                        'description_long': req.body.description_long,
                        'number_participants': req.body.number_participants,
                        'status': req.body.status,
                        'date': req.body.date,
                        'pending': [],
                        'likes': [],
                        'comments': [],
                        'waiting': [],
                        'number_left': 0
                    });
                    workshop.save().then(w => {
                        res.status(200).json({ 'msg': 'ok' });
                    }).catch(err => {
                        res.status(400).json({ 'msg': 'not ok' });
                    });
                }
            });
        };
        this.editWorkshop = (req, res) => {
            (0, server_1.uploadGalleryImages)(req, res, err => {
                if (err)
                    console.log(err);
                else {
                    console.log(req.files.length);
                    let gallery = [];
                    if (req.files != null) {
                        var fileKeys = Object.keys(req.files);
                        fileKeys.forEach(function (key) {
                            gallery.push(req.files[key].filename);
                        });
                    }
                    let photoToSave;
                    let galleryToSave;
                    if (!req.body.existingPhoto) {
                        photoToSave = gallery[0];
                        if (gallery.length == 1) {
                            galleryToSave = [];
                        }
                        else {
                            galleryToSave = gallery.slice(1);
                        }
                    }
                    else {
                        photoToSave = req.body.existingPhoto;
                        if (gallery.length == 0) {
                            galleryToSave = [];
                        }
                        else {
                            galleryToSave = gallery;
                        }
                    }
                    if (req.body.existingGallery)
                        galleryToSave = req.body.existingGallery.concat(galleryToSave);
                    workshop_2.default.findOneAndUpdate({ '_id': req.body._id }, { $set: { 'title': req.body.title,
                            'photo': photoToSave,
                            'gallery': galleryToSave,
                            'address': req.body.address,
                            'description_short': req.body.description_short,
                            'description_long': req.body.description_long,
                            'number_participants': req.body.number_participants,
                            'status': req.body.status,
                            'date': req.body.date, } }, (err) => {
                        if (err)
                            console.log(err);
                        else {
                            messages_1.default.updateMany({ 'workshop': req.body._id }, { $set: { 'title': req.body.title } }, (err1) => {
                                if (err1)
                                    console.log(err1);
                                else {
                                    comment_1.default.updateMany({ 'workshop': req.body._id }, { $set: { 'title': req.body.title } }, (err2) => {
                                        if (err2)
                                            console.log(err2);
                                        else
                                            res.json({ 'msg': 'ok' });
                                    });
                                }
                            });
                        }
                    });
                }
            });
        };
        this.getPhoto = (req, res) => {
            let imgPath = path_1.default.join(__dirname, '../../uploadsWorkshopImages') + '/' + req.body.photoName;
            res.sendFile(imgPath);
        };
        this.editWorkshopStatus = (req, res) => {
            workshop_2.default.findOneAndUpdate({ '_id': req.body._id }, { $set: { 'status': req.body.status } }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'msg': 'ok' });
            });
        };
        this.addToAccepted = (req, res) => {
            console.log(req.body);
            workshop_2.default.findOneAndUpdate({ '_id': req.body._id }, { $push: { 'accepted': req.body.username } }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'msg': 'ok' });
            });
        };
        this.removeFromPending = (req, res) => {
            workshop_2.default.findOneAndUpdate({ '_id': req.body._id }, { $pull: { 'pending': req.body.username } }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'msg': 'ok' });
            });
        };
        this.removeWorkshop = (req, res) => {
            workshop_2.default.findOneAndUpdate({ '_id': req.body._id }, { $set: { 'status': 'obrisana' } }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'msg': 'ok' });
            });
        };
    }
}
exports.WorkshopController = WorkshopController;
//# sourceMappingURL=workshop.controller.js.map