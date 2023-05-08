import * as express from 'express';
import nodemailer from 'nodemailer'
import Token from '../models/token';
import Users from '../models/users';

export class PasswordController{

    private getRandomElement(arr: any[]): any {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    
    private shuffleArray(arr: any[]): void {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

   private generatePass() : string{
        let pass: string[] = [];

        const lowerCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        const upperCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const symbols = ['!', '?', '@', '#', '£','$', '%', '^', '&', '*', '(', ')', '-', '=', '+', '_'];

        for (let i = 0; i < 4; i++) {
            pass.push(this.getRandomElement(lowerCharacters));
            pass.push(this.getRandomElement(upperCharacters));
            pass.push(this.getRandomElement(numbers));
            pass.push(this.getRandomElement(symbols));
        }
        
        this.shuffleArray(pass);
        
        return pass.join("");
    }

    sendEmail = async (email, password, link) => {
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
            subject: "Promena lozinke",
            text: "Vaša privremena lozinka je " + password + ".\n" + 
                "Na sledećoj adresi možete izvršiti izemnu svoje lozinke: " + link
        });
    }

    requestPasswordChange = (req: express.Request, res: express.Response) => {
        let email = req.body.email;

        Users.findOne({'email' : email}, (err, user) => {
            if (err) console.log(err);
            else if (user) {

                let tempPass = this.generatePass();
                console.log(tempPass);

                let token = new Token({
                    'username': user.username, 
                    'password' : tempPass, 
                    'timestamp' : new Date(), 
                    'used': false
                });
                
                token.save();
                let link = `http://localhost:4200/passwordRecovery/${user.username}`;

                this.sendEmail(email, tempPass, link);
                res.status(200).json({"msg" : "Privremena lozinka je poslata na vaš email!"});
                             
            }
            else {
                res.json({'msg' : "Ne postoji korisnik sa ovom email adresom!"});
            }
        })
    }

    passwordChange = (req: express.Request, res: express.Response) => {
        Users.updateOne({'username' : req.body.username}, {$set : {'password' : req.body.password}}, (err, user) => {
            if (err) console.log(err);
            else {
                Token.updateOne({'username' : req.body.username}, {$set : {'used' : true}}, (err2, token) => {
                    if (err2) console.log(err2);
                    else res.json({'msg' : "ok"});
                });
            } 
        })
    }

    hasActiveToken = (req: express.Request, res: express.Response) => {
        Token.findOne({'username' : req.body.username, 'used' : false}).sort({'timestamp':-1}).exec((err, token) => {
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
        })
    }
};