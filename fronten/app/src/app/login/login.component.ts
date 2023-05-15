import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '../models/token';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';
import { PasswordchangeService } from '../services/passwordchange.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private loginService: LoginService, private passChangeService : PasswordchangeService, private router: Router) { }

  logged : User;
  isLogged : boolean = false;
  hasToken : boolean = false;
  token : Token;

  ngOnInit(): void {
    if (localStorage.getItem("logged") != null) {
      this.logged = JSON.parse(localStorage.getItem("logged"));
      this.isLogged = true;
    }
  }

  username : string;
  password : string;
  message : string;

  login() {
    this.loginService.getUser(this.username).subscribe((user : User) => {
      if (!user) {
        this.message = "Korisničko ime nije ispravno!";
        return;
      }
      else {
        this.passChangeService.hasActiveToken(this.username).subscribe((t:Token) => {
          if (!t) this.hasToken = false;
          else this.token = t;

          if (!this.hasToken) {
            this.loginService.login(this.username, this.password).subscribe((user : User) => {
              if (!user) {
                this.message = "Lozinka nije ispravna ili niste još uvek registrovani!";
                return;
              }
              else {
                this.message = "";
                localStorage.setItem('logged', JSON.stringify(user));
                if (user.type == 1) this.router.navigate(['profile']);
                else this.router.navigate(['profile']);
              }
            })
          }
          else {
             if (this.hasToken && this.token.password != this.password){
              this.message = "Lozinka nije ispravna ili niste još uvek registrovani!";
              return;
             }
              else {
                this.message = "";
                localStorage.setItem('logged', JSON.stringify(user));
                if (user.type == 1) this.router.navigate(['profile']);
                else this.router.navigate(['profile']);
              }
          }
        })
      }
    })
  }
}
