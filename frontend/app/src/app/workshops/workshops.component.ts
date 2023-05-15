import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Workshop } from '../models/workshop';
import { UsersService } from '../services/users.service';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css']
})
export class WorkshopsComponent implements OnInit{

  allWorkshops : Workshop[] = [];
  activeWorkshops : Workshop[] = [];
  acceptedAndPendingWorkshops : Workshop[] = [];

  topFiveWorkshops : Workshop[] = [];

  logged : User;

  constructor(private workshopService: WorkshopService, private usersService : UsersService, private router: Router) { }

  title : string = "";
  address : string = "";

  ngOnInit(): void {

    if (localStorage.getItem("logged") != null) {
      this.logged = JSON.parse(localStorage.getItem("logged"));
      if(this.logged.type == 1) {
        this.workshopService.getAllWorkshopsOfParticipant(this.logged.username).subscribe((workshops:Workshop[]) => {
          workshops.forEach(element => {
            element.date = new Date(element.date);
            if (element.date.getTime() > new Date().getTime())
              this.acceptedAndPendingWorkshops.push(element);
          })

          this.workshopService.getAllWorkshopsOfParticipantPending(this.logged.username).subscribe((shops:Workshop[]) => {
            shops.forEach(element => {
              element.date = new Date(element.date);
              this.acceptedAndPendingWorkshops.push(element);
            })
          })
        })
      }
    }

    this.workshopService.getAllWorkshops().subscribe((workshops: Workshop[]) => {
      this.allWorkshops = workshops;
      this.activeWorkshops = workshops;

      this.allWorkshops.forEach(element => {
        element.date = new Date(element.date);
      });

      this.activeWorkshops = this.activeWorkshops.filter(element => {
        return element.date.getTime() > new Date().getTime() && element.status == 'odobrena';
      })

      this.topFiveWorkshops = this.allWorkshops;
      this.topFiveWorkshops.sort((a, b) => {
        if (a.likes.length > b.likes.length) return 1;
        else if(a.likes.length < b.likes.length) return -1;
        else return 0;
      });
      this.topFiveWorkshops = this.topFiveWorkshops.slice(0, 4);
  
    }) 
  }


  search() {
    this.activeWorkshops = this.allWorkshops.filter(element => {
      return element.date.getTime() > new Date().getTime() && element.status == 'odobrena';
    })

    this.activeWorkshops = this.activeWorkshops.filter(element => {
      return element.title.toLowerCase().includes(this.title.toLowerCase());
    })

    this.activeWorkshops = this.activeWorkshops.filter(element => {
      return element.address.toLowerCase().includes(this.address.toLowerCase());
    })
  }

  sortBy(option){
    if (option == 'title') {
      this.activeWorkshops.sort((a, b) => {
        if (a.title > b.title) return 1;
        else if (a.title < b.title) return -1;
        else return 0;
      });
    }
    else if (option == 'date') {
      this.activeWorkshops.sort((a, b) => {
        if (a.date.getTime() > b.date.getTime()) return 1;
        else if (a.date.getTime() < b.date.getTime()) return -1;
        else return 0;
      });
    }
  }


  canCancel(workshop){
    if (!workshop.accepted.includes(this.logged.username)) return false;

    let workshopDate = new Date(workshop.date);
    let currentDate = new Date();
  
    if (workshopDate.getTime() - currentDate.getTime() >= 0 &&
        workshopDate.getTime() - currentDate.getTime() <= 12*60*60*1000) return true;
    else return false;
  }
  
  cancel(workshop){
    this.workshopService.removeFromAccepted(workshop, this.logged.username).subscribe(resp => {
      if (resp['msg'] == 'ok') {
        workshop.waiting.forEach(element => {
          this.usersService.getUser(element).subscribe((user : User) => {
            this.workshopService.hasCapacity(user.email, workshop.title).subscribe(resp => {
              if (resp['msg'] != 'ok') alert('error');
              else this.updateShops();
            })
          })
        });
      }
    })
  }

  updateShops(){
    this.acceptedAndPendingWorkshops = [];
    this.workshopService.getAllWorkshopsOfParticipant(this.logged.username).subscribe((workshops:Workshop[]) => {
      workshops.forEach(element => {
        element.date = new Date(element.date);
        if (element.date.getTime() > new Date().getTime())
          this.acceptedAndPendingWorkshops.push(element);
      })
    })
    this.workshopService.getAllWorkshopsOfParticipantPending(this.logged.username).subscribe((shops:Workshop[]) => {
      shops.forEach(element => {
        element.date = new Date(element.date);
        this.acceptedAndPendingWorkshops.push(element);
      })
    })
  }


  canCancelWorkshop(workshop){
    return workshop.status == 'odobrena' && workshop.date > new Date();
  }

  cancelWorkshop(_id){
    this.workshopService.getWorkshop(_id).subscribe((workshop : Workshop) => {
      workshop.accepted.forEach(element => {
        this.usersService.getUser(element).subscribe((user : User) => {
          this.workshopService.canceledWorkshop(user.email, workshop.title).subscribe(resp => {
            if (resp['msg'] != 'ok') alert('error');
            this.workshopService.editWorkshopStatus(_id, 'otkazana').subscribe(resp2 => {
              if (resp2['msg'] != 'ok') alert('error');
              this.workshopService.getAllWorkshops().subscribe((workshops: Workshop[]) => {
                this.allWorkshops = workshops;
          
                this.allWorkshops.forEach(element => {
                  element.date = new Date(element.date);
                });
              })
            })
          })
        })
      })
    })
  }

}
