"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Comment = new Schema({
    workshop: {
        type: mongodb_1.ObjectId, ref: 'Workshop'
    },
    title: {
        type: String
    },
    user: {
        type: String
    },
    comment: {
        type: String
    },
    timestamp: {
        type: Date
    }
});
exports.default = mongoose_1.default.model('Comment', Comment, 'comments');
//# sourceMappingURL=comment.js.map