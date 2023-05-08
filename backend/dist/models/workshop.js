"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Workshop = new Schema({
    title: {
        type: String
    },
    organizer: {
        type: String
    },
    photo: {
        type: String
    },
    gallery: {
        type: [String], default: []
    },
    date: {
        type: Date
    },
    address: {
        type: String
    },
    description_short: {
        type: String
    },
    description_long: {
        type: String
    },
    number_participants: {
        type: Number
    },
    number_left: {
        type: Number, default: 0
    },
    waiting: {
        type: [String], default: []
    },
    accepted: {
        type: [String], default: []
    },
    pending: {
        type: [String], default: []
    },
    likes: {
        type: [String], default: []
    },
    comments: {
        type: [mongodb_1.ObjectId], default: []
    },
    status: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Workshop', Workshop, 'workshops');
//# sourceMappingURL=workshop.js.map