"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Message = new Schema({
    sender: {
        type: String
    },
    receiver: {
        type: String
    },
    participant: {
        type: String
    },
    organizer: {
        type: String
    },
    text: {
        type: String
    },
    timestamp: {
        type: Date
    },
    workshop: {
        type: mongodb_1.ObjectId, ref: 'Workshop'
    },
    title: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Message', Message, 'messages');
//# sourceMappingURL=messages.js.map