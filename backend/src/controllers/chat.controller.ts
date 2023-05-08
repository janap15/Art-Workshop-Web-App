import * as express from 'express';
import { ObjectId } from 'mongodb';
import Messages from '../models/messages';

export class ChatController{

    getMessages = (req: express.Request, res: express.Response) => {

        Messages.find({'participant' : req.body.participant, 'organizer' : req.body.organizer, 
            'workshop' : req.body.workshop}).sort({'timestamp' : 1}).exec((err, messages) => {
            if (err) console.log(err);
            else {
                res.json(messages);
            }
        })
    }

    getOrganizersAndShopsIContacted = (req: express.Request, res: express.Response) => {
        let participant = req.body.participant;

        Messages.aggregate([ {$match : {'participant' : participant}},
                {$group: { "_id": { organizer : "$organizer", workshop: "$workshop", title : '$title'} } }], (err, result)  => {
            if (err) console.log(err);
            else {
                console.log(result);
                res.json(result);
            }
        })
    }

    sendMessage = (req: express.Request, res: express.Response) => {
        let receiver = (req.body.sender == req.body.participant) ? req.body.organizer : req.body.participant;

        let message = new Messages({
            'sender' : req.body.sender,
            'receiver' : receiver,
            'workshop' : req.body.workshop,
            'text' : req.body.text,
            'timestamp' : new Date(),
            'participant' : req.body.participant,
            'organizer' : req.body.organizer,
            'title' : req.body.title
        });

        message.save().then( m => {
            res.status(200).json({'msg' : 'ok'});
        }).catch(err => {
            res.status(400).json({'msg' : 'not ok'});
        })
    }

    hasStartedChat = (req: express.Request, res: express.Response) => {
        Messages.find({'participant' : req.body.participant, 'workshop' : req.body.workshop}, (err, msg) => {
            if (err) console.log(err);
            else res.json(msg);
        })
    }

    getParticipantsChatters = (req: express.Request, res: express.Response) => {
        let workshop = new ObjectId(req.body.workshop);
        console.log(workshop);
        Messages.aggregate([ {$match : {'workshop' : workshop}},
                {$group: { "_id": { participant: "$participant"} } }], (err, result)  => {
            if (err) console.log(err);
            else {
                console.log(result);
                res.json(result);
            }
        })
    }
}