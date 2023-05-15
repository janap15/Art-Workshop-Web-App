import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit{

  @Output() sidenavClose = new EventEmitter();

  logged : User;

  constructor(private router :  Router) {}

  pollLogged(){
    setInterval(() => {
      if (localStorage.getItem("logged") != null) {
        this.logged = JSON.parse(localStorage.getItem("logged"));
    }}, 100)
  }


  ngOnInit(): void {
   this.pollLogged();
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

}
