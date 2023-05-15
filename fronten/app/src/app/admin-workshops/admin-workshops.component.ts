import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Workshop } from '../models/workshop';
import { UsersService } from '../services/users.service';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-admin-workshops',
  templateUrl: './admin-workshops.component.html',
  styleUrls: ['./admin-workshops.component.css']
})
export class AdminWorkshopsComponent implements OnInit {

  constructor(private workshopService : WorkshopService, private userService : UsersService) {}

  workshops : Workshop[] = [];
  requestedWorkshops : Workshop[] = [];

  logged : User;

  ngOnInit(): void {

    if (localStorage.getItem("logged") != null){
      this.logged = JSON.parse(localStorage.getItem("logged"));
    }
   
    this.workshopService.getAllAcceptedWorkshops().subscribe((workshops : Workshop[]) => {
      this.workshops = workshops;
      this.workshops.forEach(element => {
        element.date = new Date(element.date);
      })
    })

    this.workshopService.getAllRequestedWorkshops().subscribe((workshops : Workshop[]) => {
      this.requestedWorkshops = workshops;
      this.requestedWorkshops.forEach(element => {
        this.canRequest(element);
        element.date = new Date(element.date);
      });
    })
  }


  canRequest(workshop) {
    let can : boolean = true;
    this.userService.getUser(workshop.organizer).subscribe((u : User) => {
      this.workshopService.getAllWorkshopsOfParticipant(u.username).subscribe((w : Workshop[])=>{
        w.forEach(element => {
          if (new Date(element.date).getTime() > new Date().getTime()) {
            can = false;
          }
        });
        this.workshopService.getAllWorkshopsOfParticipantPending(u.username).subscribe((p : Workshop[]) => {
          if (p.length > 0) {
            can = false;
          }
          workshop.canRequest = can;
        })
      })
    })
  }

  deleteWorkshop(_id) {
    this.workshopService.removeWorkshop(_id).subscribe(resp => {
      if (resp['msg'] != 'ok') alert('error');
      else {
        this.workshopService.getAllAcceptedWorkshops().subscribe((workshops : Workshop[]) => {
          this.workshops = workshops;
          this.workshops.forEach(element => {
            element.date = new Date(element.date);
          })
        })
    
        this.workshopService.getAllRequestedWorkshops().subscribe((workshops : Workshop[]) => {
          this.requestedWorkshops = workshops;
          this.requestedWorkshops.forEach(element => {
            this.canRequest(element);
            element.date = new Date(element.date);
          });
        })
      }
    })

  }
  
  acceptWorkshop(workshop) {
    this.userService.setUserType(workshop.organizer, 2).subscribe(resp =>{
      if (resp['msg'] != 'ok') alert('error');
      else {
        this.workshopService.editWorkshopStatus(workshop._id, 'odobrena').subscribe(resp2 => {
          if (resp2['msg'] != 'ok') alert('error');
        
          this.workshopService.getAllAcceptedWorkshops().subscribe((workshops : Workshop[]) => {
            this.workshops = workshops;
            this.workshops.forEach(element => {
              element.date = new Date(element.date);
            })
          })
    
          this.workshopService.getAllRequestedWorkshops().subscribe((workshops : Workshop[]) => {
            this.requestedWorkshops = workshops;
            this.requestedWorkshops.forEach(element => {
              this.canRequest(element);
              element.date = new Date(element.date);
            });
          })
        })
      }
    })
  }
}

