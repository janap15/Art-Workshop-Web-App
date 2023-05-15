import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit{

  logged : User;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private router : Router) {}

  pollLogged(){
    setInterval(() => {
      if (localStorage.getItem("logged") != null) {
        this.logged = JSON.parse(localStorage.getItem("logged"));
    }}, 100)
  }

  ngOnInit(): void {
    this.pollLogged();
  }

  logout() {
    localStorage.clear();
    this.logged = null;
    this.router.navigate(['']);
  }

  onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  home(){
    if (!this.logged) return '/';
    if (this.logged.type == 0) return '/admin';
    if (this.logged.type == 1) return '/profile';
    if (this.logged.type == 2) return '/profile';
    return '/';
  }
}
