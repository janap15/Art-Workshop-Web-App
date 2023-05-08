"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_controller_1 = require("../controllers/chat.controller");
const chatRouter = express_1.default.Router();
chatRouter.route('/getMessages').post((req, res) => new chat_controller_1.ChatController().getMessages(req, res));
chatRouter.route('/getOrganizersAndShopsIContacted').post((req, res) => new chat_controller_1.ChatController().getOrganizersAndShopsIContacted(req, res));
chatRouter.route('/sendMessage').post((req, res) => new chat_controller_1.ChatController().sendMessage(req, res));
chatRouter.route('/hasStartedChat').post((req, res) => new chat_controller_1.ChatController().hasStartedChat(req, res));
chatRouter.route('/getParticipantsChatters').post((req, res) => new chat_controller_1.ChatController().getParticipantsChatters(req, res));
exports.default = chatRouter;
//# sourceMappingURL=chat.route.js.map