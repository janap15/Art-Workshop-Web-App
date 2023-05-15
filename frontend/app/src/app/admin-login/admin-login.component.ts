import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  constructor(private loginService: LoginService, private router: Router) { }

  logged : User;


  ngOnInit(): void {
    if (localStorage.getItem("logged") != null) {
      this.logged = JSON.parse(localStorage.getItem("logged"));
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
        this.loginService.login(this.username, this.password).subscribe((user : User) => {
          if (!user) {
            this.message = "Lozinka nije ispravna!";
            return;
          }
          else {
            this.message = "";
            localStorage.setItem('logged', JSON.stringify(user));
            if (user.type == 0) this.router.navigate(['admin']);
            else this.router.navigate(['']);
          }
        })
      }
    })
  }
}
