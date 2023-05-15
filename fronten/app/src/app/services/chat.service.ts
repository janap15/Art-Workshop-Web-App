import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  uri = 'http://127.0.0.1:4000/chat';

  constructor(private http: HttpClient) { }

  getMessages(participant, organizer, workshop){
    const data = {
      participant : participant,
      organizer : organizer,
      workshop : workshop
    }
    return this.http.post(`${this.uri}/getMessages`, data);
  }

  getOrganizersAndShopsIContacted(participant){
    const data = {
      participant : participant
    }
    return this.http.post(`${this.uri}/getOrganizersAndShopsIContacted`, data);
  }

  sendMessage(sender, participant, organizer, workshop, title, text){
    const data = {
      sender : sender,
      participant : participant,
      organizer : organizer, 
      workshop : workshop,
      text : text,
      title : title
    }
    return this.http.post(`${this.uri}/sendMessage`, data);
  }

  hasStartedChat(participant, workshop){
    const data = {
      participant : participant,
      workshop : workshop,
    }
    return this.http.post(`${this.uri}/hasStartedChat`, data);
  }

  getParticipantsChatters(workshop){
    const data = {
      workshop : workshop
    }
    return this.http.post(`${this.uri}/getParticipantsChatters`, data);
  }

}
