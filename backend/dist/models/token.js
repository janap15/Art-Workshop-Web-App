"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Token = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    timestamp: {
        type: Date
    },
    used: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('Token', Token, 'tokens');
//# sourceMappingURL=token.js.map