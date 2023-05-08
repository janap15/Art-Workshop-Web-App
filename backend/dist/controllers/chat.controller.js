"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const mongodb_1 = require("mongodb");
const messages_1 = __importDefault(require("../models/messages"));
class ChatController {
    constructor() {
        this.getMessages = (req, res) => {
            messages_1.default.find({ 'participant': req.body.participant, 'organizer': req.body.organizer,
                'workshop': req.body.workshop }).sort({ 'timestamp': 1 }).exec((err, messages) => {
                if (err)
                    console.log(err);
                else {
                    res.json(messages);
                }
            });
        };
        this.getOrganizersAndShopsIContacted = (req, res) => {
            let participant = req.body.participant;
            messages_1.default.aggregate([{ $match: { 'participant': participant } },
                { $group: { "_id": { organizer: "$organizer", workshop: "$workshop", title: '$title' } } }], (err, result) => {
                if (err)
                    console.log(err);
                else {
                    console.log(result);
                    res.json(result);
                }
            });
        };
        this.sendMessage = (req, res) => {
            let receiver = (req.body.sender == req.body.participant) ? req.body.organizer : req.body.participant;
            let message = new messages_1.default({
                'sender': req.body.sender,
                'receiver': receiver,
                'workshop': req.body.workshop,
                'text': req.body.text,
                'timestamp': new Date(),
                'participant': req.body.participant,
                'organizer': req.body.organizer,
                'title': req.body.title
            });
            message.save().then(m => {
                res.status(200).json({ 'msg': 'ok' });
            }).catch(err => {
                res.status(400).json({ 'msg': 'not ok' });
            });
        };
        this.hasStartedChat = (req, res) => {
            messages_1.default.find({ 'participant': req.body.participant, 'workshop': req.body.workshop }, (err, msg) => {
                if (err)
                    console.log(err);
                else
                    res.json(msg);
            });
        };
        this.getParticipantsChatters = (req, res) => {
            let workshop = new mongodb_1.ObjectId(req.body.workshop);
            console.log(workshop);
            messages_1.default.aggregate([{ $match: { 'workshop': workshop } },
                { $group: { "_id": { participant: "$participant" } } }], (err, result) => {
                if (err)
                    console.log(err);
                else {
                    console.log(result);
                    res.json(result);
                }
            });
        };
    }
}
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map