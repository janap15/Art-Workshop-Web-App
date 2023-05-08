"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Users = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    profileImg: {
        type: String
    },
    orgName: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    postNum: {
        type: Number
    },
    street: {
        type: String
    },
    streetNum: {
        type: Number
    },
    MB: {
        type: Number
    },
    type: {
        type: Number
    },
    status: {
        type: String // obrada, aktivan ako je prihvacen zahtev za registraciju, neaktivan ako je odbijen
    }
});
exports.default = mongoose_1.default.model('Users', Users, 'users');
//# sourceMappingURL=users.js.map