import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Comment } from '../models/comment';
import { User } from '../models/user';
import { Workshop } from '../models/workshop';
import { ChatService } from '../services/chat.service';
import { UsersService } from '../services/users.service';
import { WorkshopService } from '../services/workshop.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  dataSourceWorkshops = new MatTableDataSource<Workshop>();
  displayedColumnsWorkshops : string[] = ['title', 'organizer', 'date', 'address', 'description_long'];
  workshops : Workshop[] = [];
  titles : Object = {'title' : 'Naziv radionice', 'organizer' : 'Organizator', 'date' : 'Datum i vreme', 'address' : 'Adresa', 'description_long' : 'Opis', 
  'action' : 'Akcija', 'comment' : 'Komentar', 'remove' : 'Ukloni', 'chats' : 'Ćaskanja za radionicu'};
  
  dataSourceLikes = new MatTableDataSource<Workshop>();
  displayedColumnsLikes : string[] = ['title', 'action'];
  likedWorkshops : Workshop[] = [];

  dataSourceComments = new MatTableDataSource<Comment>();
  displayedColumnsComments : string[] = ['title', 'comment', 'action', 'remove'];
  comments : Comment[] = [];

  logged : User;
  orgAddr : string = "";
  organizersAndWorkshops : Object[] = [];

  dataSourceOrgWorkshops = new MatTableDataSource<Workshop>();
  displayedColumnsOrgWorkshops : string[] = ['title', 'chats'];
  workshopsOfOrganizer : Workshop[] = [];

  constructor(private userService : UsersService, private workshopService : WorkshopService, private router : Router, 
      private chatService : ChatService) {}

  ngOnInit(): void {
    if (localStorage.getItem("logged") != null) {
      this.logged = JSON.parse(localStorage.getItem("logged"));

      if (this.logged.type == 2) {
        if (this.logged.street) this.orgAddr += this.logged.street;
        if (this.logged.streetNum) this.orgAddr += " " + this.logged.streetNum;
        if (this.logged.city) this.orgAddr += ", " + this.logged.city;
        if (this.logged.state) this.orgAddr += ", " + this.logged.state;
        if (this.logged.state) this.orgAddr += " " + this.logged.postNum;

        this.workshopService.getAllWorkshopsOfOrganizer(this.logged.username).subscribe((workshops : Workshop[]) => {
          this.workshopsOfOrganizer = workshops;
          this.workshopsOfOrganizer.forEach(element => {
            element.date = new Date(element.date);
          })
          this.dataSourceOrgWorkshops.data = this.workshopsOfOrganizer;
        })
      }

      if (this.logged.type == 1) {
        this.workshopService.getAllWorkshopsOfParticipant(this.logged.username).subscribe((workshops: Workshop[]) => {
          workshops.forEach(element => {
            element.date = new Date(element.date);
            if (element.date.getTime() < new Date().getTime()) this.workshops.push(element);
          });

          this.dataSourceWorkshops.data = this.workshops;
        })

        this.workshopService.getAllLikedWorkshops(this.logged.username).subscribe((liked : Workshop[]) => {
          this.likedWorkshops = liked;
          this.dataSourceLikes.data = this.likedWorkshops;
        })

        this.userService.getAllComments(this.logged.username).subscribe((comm : Comment[]) => {
          this.comments = comm;
          this.dataSourceComments.data = this.comments;
        });

        this.chatService.getOrganizersAndShopsIContacted(this.logged.username).subscribe((organizersWorkshops : Object[]) => {
          this.organizersAndWorkshops = organizersWorkshops;
        })
      }

        if (this.logged.profileImg != "") {
          this.userService.getImg(this.logged.profileImg).subscribe((image)=>{
            let urlCreator = window.URL || window.webkitURL;
            let imageUrl = urlCreator.createObjectURL( image );
            let img: HTMLImageElement = document.querySelector( "#img" );
            img.src = imageUrl;
          });
        }
        else {
          let img: HTMLImageElement = document.querySelector( "#img" );
          img.src = "../../assets/avatar-icon.png";
        }
      }
    }

 
    sortByTitle() {
      this.workshops.sort((a, b) => {
        if (a.title > b.title) return 1;
        else if (a.title < b.title) return -1;
        else return 0;
      })
      this.dataSourceWorkshops.data = this.workshops;
    }

    sortByOrganizer() {
      this.workshops.sort((a, b) => {
        if (a.organizer > b.organizer) return 1;
        else if (a.organizer < b.organizer) return -1;
        else return 0;
      })
      this.dataSourceWorkshops.data = this.workshops;
    }

    sortByAddress() {
      this.workshops.sort((a, b) => {
        if (a.address > b.address) return 1;
        else if (a.address < b.address) return -1;
        else return 0;
      })
      this.dataSourceWorkshops.data = this.workshops;
    }

    sortByDescription() {
      this.workshops.sort((a, b) => {
        if (a.description_long > b.description_long) return 1;
        else if (a.description_long < b.description_long) return -1;
        else return 0;
      })
      this.dataSourceWorkshops.data =  this.workshops;
    }

    sortByDate() {
      this.workshops.sort((a, b) => {
        if (a.date.getTime() > b.date.getTime()) return 1;
        else if (a.date.getTime() < b.date.getTime()) return -1;
        else return 0;
      })
      this.dataSourceWorkshops.data = this.workshops;
    }

    removeLike(shop) {
      this.workshopService.removeLike(this.logged.username, shop._id).subscribe((resp)=>{
        if (resp['msg']=='ok'){
          this.workshopService.getAllLikedWorkshops(this.logged.username).subscribe((liked : Workshop[]) => {
            this.likedWorkshops = liked;
            this.dataSourceLikes.data = this.likedWorkshops;
          })
        }
        else alert('error');
      })
    }

    removeComment(comment) {
      this.userService.removeComment(comment).subscribe((resp)=>{
        if (resp['msg']=='ok'){
          this.userService.getAllComments(this.logged.username).subscribe((comm : Comment[]) => {
            this.comments = comm;
            this.dataSourceComments.data = this.comments;
            });
          }
        else alert('error');
      })
    }

    changeComment(comm) {
      this.userService.editComment(comm).subscribe((resp)=>{
        if (resp['msg']=='ok'){
          this.userService.getAllComments(this.logged.username).subscribe((comm : Comment[]) => {
            this.comments = comm;
            this.dataSourceComments.data = this.comments;
            });
          }
        else alert('error');
      })
    }

}


