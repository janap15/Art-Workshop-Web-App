import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordchangeService } from '../services/passwordchange.service';

@Component({
  selector: 'app-request-password-recovery',
  templateUrl: './request-password-recovery.component.html',
  styleUrls: ['./request-password-recovery.component.css']
})
export class RequestPasswordRecoveryComponent {
  constructor(private passChangeService: PasswordchangeService, private router: Router) { }

  logged : string = "";
  isLogged : boolean = false;

  ngOnInit(): void {
    if (localStorage.getItem("logged") != null) {
      this.logged = JSON.parse(localStorage.getItem("logged"));
      this.isLogged = true;
    }
  }

  message : string = "";
  email : string = "";

  passChange() {
    if (!this.email) {
      this.message = "Morate uneti svoju email adresu!";
      return;
    }

    this.passChangeService.reqPasswordChange(this.email).subscribe(res => {
      this.message = res['msg'];
    })

  }
}
