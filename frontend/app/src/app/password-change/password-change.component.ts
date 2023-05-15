import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '../models/token';
import { User } from '../models/user';
import { PasswordchangeService } from '../services/passwordchange.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent {

  constructor(private passChangeService: PasswordchangeService, private router: Router) { }

  logged : User;
  isLogged : boolean = false;
  hasToken : boolean = true;
  token : Token;

  ngOnInit(): void {
    if (localStorage.getItem("logged") != null) {
      this.logged = JSON.parse(localStorage.getItem("logged"));
      this.isLogged = true;
    }

    this.passChangeService.hasActiveToken(this.logged.username).subscribe((t:Token) => {
      if (!t) this.hasToken = false;
      else this.token = t;

    })
  }
  
  message : string = "";
  oldPass : string = "";
  pass1 : string = "";
  pass2 : string = "";

  passChange() {
    if (!this.hasToken && this.oldPass != this.logged.password) {
      this.message = "Vaša stara lozinka nije ispravna!";
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

    let regexPass : RegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    if (!regexPass.test(this.pass1)) {
      this.message = "Lozinka nije u dobrom formatu!";
      return;
    }

    if (!(this.pass1 === this.pass2)){
      this.message = "Ponovljena lozinka mora biti ista!";
      return;
    }

    this.passChangeService.passwordChange(this.logged.username, this.pass1).subscribe(resp => {
      this.message = resp['msg'];
      if (resp['msg'] == 'ok') {
        this.isLogged = false;
        localStorage.clear();
        this.router.navigate(['']);
      }
    })
  }
}
