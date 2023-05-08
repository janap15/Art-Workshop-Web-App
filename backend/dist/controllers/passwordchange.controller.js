"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordController = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const token_1 = __importDefault(require("../models/token"));
const users_1 = __importDefault(require("../models/users"));
class PasswordController {
    constructor() {
        this.sendEmail = (email, password, link) => __awaiter(this, void 0, void 0, function* () {
            const transporter = nodemailer_1.default.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'jana.pasajlic@gmail.com',
                    pass: 'zvmwslwgajjehbhs',
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            yield transporter.sendMail({
                from: 'jana.pasajlic@gmail.com',
                to: email,
                subject: "Promena lozinke",
                text: "Vaša privremena lozinka je " + password + ".\n" +
                    "Na sledećoj adresi možete izvršiti izemnu svoje lozinke: " + link
            });
        });
        this.requestPasswordChange = (req, res) => {
            let email = req.body.email;
            users_1.default.findOne({ 'email': email }, (err, user) => {
                if (err)
                    console.log(err);
                else if (user) {
                    let tempPass = this.generatePass();
                    console.log(tempPass);
                    let token = new token_1.default({
                        'username': user.username,
                        'password': tempPass,
                        'timestamp': new Date(),
                        'used': false
                    });
                    token.save();
                    let link = `http://localhost:4200/passwordRecovery/${user.username}`;
                    this.sendEmail(email, tempPass, link);
                    res.status(200).json({ "msg": "Privremena lozinka je poslata na vaš email!" });
                }
                else {
                    res.json({ 'msg': "Ne postoji korisnik sa ovom email adresom!" });
                }
            });
        };
        this.passwordChange = (req, res) => {
            users_1.default.updateOne({ 'username': req.body.username }, { $set: { 'password': req.body.password } }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    token_1.default.updateOne({ 'username': req.body.username }, { $set: { 'used': true } }, (err2, token) => {
                        if (err2)
                            console.log(err2);
                        else
                            res.json({ 'msg': "ok" });
                    });
                }
            });
        };
        this.hasActiveToken = (req, res) => {
            token_1.default.findOne({ 'username': req.body.username, 'used': false }).sort({ 'timestamp': -1 }).exec((err, token) => {
                if (token) {
                    let timestamp = new Date(token.timestamp);
                    let now = new Date();
                    console.log(token);
                    console.log(Math.abs(now.getTime() - timestamp.getTime()));
                    if (Math.abs(now.getTime() - timestamp.getTime()) / (60 * 1000) < 30) {
                        res.json(token);
                    }
                    else {
                        res.json("");
                    }
                }
                else {
                    res.json("");
                }
            });
        };
    }
    getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    generatePass() {
        let pass = [];
        const lowerCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        const upperCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const symbols = ['!', '?', '@', '#', '£', '$', '%', '^', '&', '*', '(', ')', '-', '=', '+', '_'];
        for (let i = 0; i < 4; i++) {
            pass.push(this.getRandomElement(lowerCharacters));
            pass.push(this.getRandomElement(upperCharacters));
            pass.push(this.getRandomElement(numbers));
            pass.push(this.getRandomElement(symbols));
        }
        this.shuffleArray(pass);
        return pass.join("");
    }
}
exports.PasswordController = PasswordController;
;
//# sourceMappingURL=passwordchange.controller.js.map