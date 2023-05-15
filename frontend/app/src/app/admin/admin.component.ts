import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Workshop } from '../models/workshop';
import { UsersService } from '../services/users.service';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  
  logged : User;
  activeUsers : User[] = [];
  registerRequests : User[] = [];
 
  constructor(private userService : UsersService, private workshopService : WorkshopService) {} 

  ngOnInit(): void {
    if (localStorage.getItem("logged") != null) {
      this.logged = JSON.parse(localStorage.getItem("logged"));
      this.userService.getAllActiveUsers().subscribe((users : User[]) => {
        this.activeUsers = users;
        this.activeUsers = this.activeUsers.filter(user => {
          return user.username != 'admin'
        })
      })

      this.userService.getRegisterRequests().subscribe((requests : User[]) => {
        this.registerRequests = requests;
      })
    }
  }

  delete(username) {
    this.userService.removeUser(username).subscribe(resp => {
      if (resp['msg'] != 'ok') alert('error');
      else {
        this.userService.getAllActiveUsers().subscribe((users : User[]) => {
          this.activeUsers = users;
          this.activeUsers = this.activeUsers.filter(user => {
            return user.username != 'admin'
          })
        })
  
        this.userService.getRegisterRequests().subscribe((requests : User[]) => {
          this.registerRequests = requests;
        })
      }
    }) 
  }

  approve(username) {
    this.userService.approveReq(username).subscribe(resp => {
      if (resp['msg'] == 'ok') {
        this.userService.getAllActiveUsers().subscribe((users : User[]) => {
          this.activeUsers = users;
          this.activeUsers = this.activeUsers.filter(user => {
            return user.username != 'admin'
          })
          this.userService.getRegisterRequests().subscribe((requests : User[]) => {
            this.registerRequests = requests;
          })
        })
      }
    })
  }

  reject(username) {
    this.userService.rejectReq(username).subscribe(resp => {
      if (resp['msg'] == 'ok') {
        this.userService.getAllActiveUsers().subscribe((users : User[]) => {
          this.activeUsers = users;
          this.activeUsers = this.activeUsers.filter(user => {
            return user.username != 'admin'
          })
          this.userService.getRegisterRequests().subscribe((requests : User[]) => {
            this.registerRequests = requests;
          })
        })
      }
    })
  }

}
