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
exports.SendEmailsWorkshopController = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const users_1 = __importDefault(require("../models/users"));
class SendEmailsWorkshopController {
    constructor() {
        this.sendEmail = (email, subject, text) => __awaiter(this, void 0, void 0, function* () {
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
                subject: subject,
                text: text
            });
        });
        this.canceledWorkshop = (req, res) => {
            let email = req.body.email;
            let title = req.body.title;
            users_1.default.findOne({ 'email': email }, (err, user) => {
                if (err)
                    console.log(err);
                else if (user) {
                    let subject = "Otkazivanje " + title + " radionice";
                    let text = "Poštovani " + user.firstname + " " + user.lastname + ",\n\nObaveštavamo Vas da je radionica " + title + " otkazana.\n\n" + "Srdačan pozdrav\n";
                    this.sendEmail(email, subject, text);
                    res.status(200).json({ "msg": "ok" });
                }
                else {
                    res.status(400).json({ 'msg': "not ok!" });
                }
            });
        };
        this.hasCapacity = (req, res) => {
            let email = req.body.email;
            let title = req.body.title;
            users_1.default.findOne({ 'email': email }, (err, user) => {
                if (err)
                    console.log(err);
                else if (user) {
                    let subject = "Novo mesto na " + title + " radionici";
                    let text = "Poštovani " + user.firstname + " " + user.lastname + ",\n\nObaveštavamo Vas da ima mesta na radionici " + title + ".\n\n" + "Srdačan pozdrav\n";
                    this.sendEmail(email, subject, text);
                    res.status(200).json({ "msg": "ok" });
                }
                else {
                    res.status(400).json({ 'msg': "not ok!" });
                }
            });
        };
    }
}
exports.SendEmailsWorkshopController = SendEmailsWorkshopController;
;
//# sourceMappingURL=sendemailsworkshop.controller.js.map