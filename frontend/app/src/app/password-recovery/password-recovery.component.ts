import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Token } from '../models/token';
import { User } from '../models/user';
import { PasswordchangeService } from '../services/passwordchange.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit{

  constructor(private route: ActivatedRoute, private passChangeService: PasswordchangeService, private router: Router) { }

  username : string = "";
  hasToken : boolean = true;
  token : Token;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username']; 
      this.passChangeService.hasActiveToken(this.username).subscribe((t:Token) => {
      if (!t) {
        this.hasToken = false;
        this.message = "Vaš token za zaboravljenu lozinku je istekao ili ne postoji!"
      }
      else {
        this.token = t;
        this.hasToken = true;
      }
     })
    })
  }
  
  message : string = "";
  tempPass : string = "";
  pass1 : string = "";
  pass2 : string = "";

  passChange() {
    if (!this.tempPass && this.hasToken) {
      this.message = "Morate uneti privremenu lozinku koju ste dobili email-u!";
      return;
    }
    if (!this.pass1) {
      this.message = "Morate uneti novu lozinku!";
      return;
    }
    if (!this.pass2) {
      this.message = "Morate uneti još jednom novu lozinku!";
      return;
    }

    if (this.hasToken && this.tempPass !== this.token.password) {
      alert(this.token.password);
      this.message = "Privremena lozinka nije ispravna!";
      return;
    }

    let regexPass : RegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    if (!regexPass.test(this.pass1)) {
      this.message = "Lozinka nije u dobrom formatu!";
      return;
    }

    if (!(this.pass1 === this.pass2)){
      this.message = "Ponovljena lozinka mora biti ista!";
      return;
    }

    this.passChangeService.passwordChange(this.username, this.pass1).subscribe(resp => {
      this.message = resp['msg'];
    })
  }
}
