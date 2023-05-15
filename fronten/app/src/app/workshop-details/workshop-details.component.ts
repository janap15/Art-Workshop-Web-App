import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Workshop } from '../models/workshop';
import { MapService } from '../services/map.service';
import { WorkshopService } from '../services/workshop.service';
import * as L from 'leaflet';
import { User } from '../models/user';
import { Comment } from '../models/comment';
import { UsersService } from '../services/users.service';
import {DomSanitizer} from '@angular/platform-browser';
import { ChatService } from '../services/chat.service';
import { Message } from '../models/message';

@Component({
  selector: 'app-workshop-details',
  templateUrl: './workshop-details.component.html',
  styleUrls: ['./workshop-details.component.css']
})
export class WorkshopDetailsComponent implements OnInit, AfterViewInit{

  constructor(private route: ActivatedRoute, private workshopService : WorkshopService, private userService : UsersService,
              private mapService : MapService, private sanitizer:DomSanitizer, private chatService : ChatService,
              private router: Router) { }
 

  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;

  workshop : Workshop = null;
  _id : string;
  lat : number;
  lon : number;
  map : L.Map;
  canRequest : boolean = false;
  logged : User = null;
  attendedWorkshops : Workshop[] = [];
  hasAttended : boolean = false;
  comments : Comment[] = [];
  canLike : boolean = false;
  newComment : string = "";
  message : string = "";

  mainImgSrc : string = "../../assets/avatar-icon.png";
  
  canBeginChat : boolean = true;

  gallery : string[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this._id = params['_id'];
      if (JSON.parse(localStorage.getItem("logged")) != null) {
        this.logged = JSON.parse(localStorage.getItem("logged"));
        this.workshopService.getAllWorkshopsOfParticipant(this.logged.username).subscribe((workshops : Workshop[])=>{
          this.attendedWorkshops = workshops;
        })
      }
    })
  }
  
  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ngAfterViewInit(): void {
    this.workshopService.getWorkshop(this._id).subscribe((shop : Workshop) => {
      this.workshop = shop;
      this.workshop.date = new Date(this.workshop.date);
      if (this.workshop.photo != '')
        this.workshopService.getPhoto(this.workshop.photo).subscribe((image) => {
          let urlCreator = window.URL || window.webkitURL;
            let imageUrl = urlCreator.createObjectURL(image);
            this.mainImgSrc = this.sanitize(imageUrl) as string;
      })

      this.workshop.gallery.forEach(el=>{
        this.workshopService.getPhoto(el).subscribe(image => {
          let urlCreator = window.URL || window.webkitURL;
          let imageUrl = urlCreator.createObjectURL(image);
          this.gallery.push(this.sanitize(imageUrl) as string);
        })
      })

      this.mapService.longLatOfAaddress(this.workshop.address).subscribe( resp =>{
        this.lat = resp[0]['lat'];
        this.lon = resp[0]['lon'];
      
        this.map = L.map(this.mapContainer.nativeElement).setView([this.lat, this.lon], 17 );
    
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', 
        { minZoom: 10}).addTo(this.map);
        
        var icon = L.icon({
          iconUrl: 'marker-icon.png',
        });
        
        L.marker([this.lat, this.lon], {icon: icon}).addTo(this.map);
      })

      if (this.workshop.waiting.includes(this.logged.username) 
        || this.workshop.pending.includes(this.logged.username)) 
        this.canRequest = false;
      else this.canRequest = true;

      if (this.workshop.likes.includes(this.logged.username)) this.canLike = false;
      else this.canLike = true;
      
      for (let index = 0; index < this.attendedWorkshops.length; index++) {
        if (this.attendedWorkshops[index].title === this.workshop.title){
          this.hasAttended = true;
          break;
        }
      }

      this.workshop.comments.forEach(element => {
        this.workshopService.getComment(element).subscribe((comm : Comment) => {
         this.comments.push(comm);
          });
        })
      
      this.chatService.hasStartedChat(this.logged.username, this.workshop._id).subscribe((mess: Message[]) => {
        if (mess.length > 0) this.canBeginChat = false; 
      })
    } 
    )}
  
    addToPending(){
      this.workshopService.addToPending(this.workshop._id, this.logged.username).subscribe(resp => {
        if (resp['msg'] == 'ok') this.canRequest = false;
      })
    }

    addToWaiting(){
      this.workshopService.addToWaiting(this.workshop._id, this.logged.username).subscribe(resp => {
        if (resp['msg'] == 'ok') this.canRequest = false;
      })
    }

    like(){
      this.workshopService.addLike(this.workshop._id, this.logged.username).subscribe(resp => {
        if (resp['msg'] == 'ok') this.canLike = false;
      })
    }

    addComment() {
      if (!this.newComment) this.message = "Ne možete ostaviti prazan komentar!";
      else {
        this.workshopService.addComment(this.workshop, this.logged.username, this.newComment).subscribe(resp => {
          if (resp['msg'] == 'ok'){
            this.workshop.comments = [];
            this.workshop.comments.forEach(element => {
              this.workshopService.getComment(element).subscribe((comm : Comment) => {
               this.comments.push(comm);
                });
              })
              window.location.reload()
          } else alert("error");
        })
      }
    }

    newMess : string = "";
    errMess : string = "";
    beginChat(){
      if (!this.newMess) {
        this.errMess = "Ne možete poslati praznu poruku!";
        return;
      }
      this.errMess = "";
      alert(JSON.stringify(this.workshop));
      this.chatService.sendMessage(this.logged.username, this.logged.username, this.workshop.organizer,
        this.workshop._id, this.workshop.title, this.newMess).subscribe(resp => {
          if (resp['msg'] != 'ok') alert('error');
          else this.canBeginChat = false;
        })
    }

  }
