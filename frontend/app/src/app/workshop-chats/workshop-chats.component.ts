import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { Workshop } from '../models/workshop';
import { ChatService } from '../services/chat.service';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-workshop-chats',
  templateUrl: './workshop-chats.component.html',
  styleUrls: ['./workshop-chats.component.css']
})
export class WorkshopChatsComponent implements OnInit{

  constructor(private chatService : ChatService, private workshopService : WorkshopService,
              private route : ActivatedRoute){}

  logged : User;
  workshop : Workshop = new Workshop();
  participantsChatters : Object[] = [];

  ngOnInit(): void {
    if (localStorage.getItem("logged") != null) {
      this.logged = JSON.parse(localStorage.getItem("logged"));
    }

    this.route.params.subscribe(param => {
      let _id = param['_id'];
      this.workshopService.getWorkshop(_id).subscribe((shop : Workshop) => {
        this.workshop = shop;
        this.workshop.date = new Date(this.workshop.date);

        this.chatService.getParticipantsChatters(_id).subscribe((result : Object[]) => {
          this.participantsChatters = result;
        })
      })
    })
  }

  show : boolean = false;
  onclick() {
    this.show = !this.show;
  }
}
