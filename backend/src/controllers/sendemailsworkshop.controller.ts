import * as express from 'express';
import nodemailer from 'nodemailer'
import Users from '../models/users';

export class SendEmailsWorkshopController{

    sendEmail = async (email, subject, text) => {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'jana.pasajlic@gmail.com',
                pass: 'zvmwslwgajjehbhs',
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        await transporter.sendMail({
            from: 'jana.pasajlic@gmail.com',
            to: email,
            subject: subject,
            text: text
        });
    }

    canceledWorkshop = (req: express.Request, res: express.Response) => {
        let email = req.body.email;
        let title = req.body.title;

        Users.findOne({'email' : email}, (err, user) => {
            if (err) console.log(err);
            else if (user) {

                let subject : string = "Otkazivanje " + title + " radionice";
                let text : string = "Poštovani " + user.firstname + " " + user.lastname + ",\n\nObaveštavamo Vas da je radionica " + title + " otkazana.\n\n" + "Srdačan pozdrav\n";
                this.sendEmail(email, subject, text);
                res.status(200).json({"msg" : "ok"});
                             
            }
            else {
                res.status(400).json({'msg' : "not ok!"});
            }
        })
    }

    hasCapacity = (req: express.Request, res: express.Response) => {
        let email = req.body.email;
        let title = req.body.title;

        Users.findOne({'email' : email}, (err, user) => {
            if (err) console.log(err);
            else if (user) {

                let subject : string = "Novo mesto na " + title + " radionici";
                let text : string = "Poštovani " + user.firstname + " " + user.lastname + ",\n\nObaveštavamo Vas da ima mesta na radionici " + title + ".\n\n" + "Srdačan pozdrav\n";
                this.sendEmail(email, subject, text);
                res.status(200).json({"msg" : "ok"});
                             
            }
            else {
                res.status(400).json({'msg' : "not ok!"});
            }
        })
    }
    
};