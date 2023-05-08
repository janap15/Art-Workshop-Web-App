import express from 'express';
import { ChatController } from '../controllers/chat.controller';

const chatRouter = express.Router();

chatRouter.route('/getMessages').post(
    (req, res) => new ChatController().getMessages(req, res)
)

chatRouter.route('/getOrganizersAndShopsIContacted').post(
    (req, res) => new ChatController().getOrganizersAndShopsIContacted(req, res)
)

chatRouter.route('/sendMessage').post(
    (req, res) => new ChatController().sendMessage(req, res)
)

chatRouter.route('/hasStartedChat').post(
    (req, res) => new ChatController().hasStartedChat(req, res)
)

chatRouter.route('/getParticipantsChatters').post(
    (req, res) => new ChatController().getParticipantsChatters(req, res)
)


export default chatRouter;