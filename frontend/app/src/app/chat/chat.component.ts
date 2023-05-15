import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Message } from '../models/message';
import { User } from '../models/user';
import { ChatService } from '../services/chat.service';
import { UsersService } from '../services/users.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  @Input() organizer : string;
  @Input() participant : string;
  @Input() sender : string;
  @Input() workshop : string;
  @Input() title : string;
  @Input() show : boolean;

  messages : Message[] = [];
  senderSrc : string = "../../assets/avatar-icon.png";
  receiverSrc : string = "../../assets/avatar-icon.png";
  lastPollingDate : Date = null;
  
  constructor(private chatService : ChatService, private userService : UsersService, private sanitizer:DomSanitizer) {
  }

  pollMessages(){
      setInterval(() => {
      const newDate = new Date();
      this.chatService.getMessages(this.participant, this.organizer, this.workshop).subscribe((messages : Message[]) => {
        if (this.lastPollingDate == null || this.lastPollingDate < new Date(messages[messages.length - 1].timestamp)){
        messages.forEach(element => {
          element.timestamp = new Date(element.timestamp);
        })
        this.messages = messages;
      }
        this.lastPollingDate = newDate;
      })
    }, 500)
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnInit() : void {
    this.pollMessages();

    
    this.userService.getUser(this.participant).subscribe((user : User) => {
      if (user.profileImg != ""){
          this.userService.getImg(user.profileImg).subscribe((image) => {
            let urlCreator = window.URL || window.webkitURL;
            let imageUrl = urlCreator.createObjectURL(image);
            if (this.participant == this.sender) this.senderSrc = this.sanitize(imageUrl) as string;
            else this.receiverSrc = this.sanitize(imageUrl) as string;
          })
        }
    })    

    this.userService.getUser(this.organizer).subscribe((user : User) => {
      if (user.profileImg != ""){
          this.userService.getImg(user.profileImg).subscribe((image) => {
            let urlCreator = window.URL || window.webkitURL;
            let imageUrl = urlCreator.createObjectURL(image);
            if (this.organizer == this.sender) this.senderSrc = this.sanitize(imageUrl) as string;
            else this.receiverSrc = this.sanitize(imageUrl) as string;
          })
        }
    })    

  }

  mess : string = "";
  error : string = "";

  sendMessage(){
    if (!this.mess) {
      this.error = "Ne možete poslati praznu poruku!";
      return; 
    }
    else {
      this.error = "";
      this.chatService.sendMessage(this.sender, this.participant,this.organizer, this.workshop, this.title, this.mess).subscribe(resp => {
        if (resp['msg'] != 'ok') alert('error');
        this.mess = "";
      })
    }
  }



}
