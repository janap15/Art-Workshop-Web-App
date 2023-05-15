import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  uri = 'http://127.0.0.1:4000/workshop';

  constructor(private http: HttpClient) { }

  getAllWorkshops(){
    return this.http.get(`${this.uri}/getAllWorkshops`);
  }

  getAllAcceptedWorkshops(){
    return this.http.get(`${this.uri}/getAllAcceptedWorkshops`);
  }

  getAllRequestedWorkshops(){
    return this.http.get(`${this.uri}/getAllRequestedWorkshops`);
  }

  getAllWorkshopsOfOrganizer(organizer) {
    const data = {
      organizer : organizer
    }
    return this.http.post(`${this.uri}/getAllWorkshopsOfOrganizer`, data);
  }

  getAllWorkshopsOfParticipant(username){
    const data = {
      username : username
    }
    return this.http.post(`${this.uri}/getAllWorkshopsOfUser`, data);
  }

  getAllWorkshopsOfParticipantPending(username){
    const data = {
      username : username
    }
    return this.http.post(`${this.uri}/getAllWorkshopsOfUserPending`, data);
  }

  getAllLikedWorkshops(username) {
    const data = {
      username : username
    }
    return this.http.post(`${this.uri}/getAllLikedWorkshops`, data);
  }

  removeLike(username, _id) {
    const data = {
      username : username,
      _id : _id
    }
    return this.http.post(`${this.uri}/removeLike`, data);
  }

  getWorkshop(_id) {
    const data = {
      _id : _id
    }
    return this.http.post(`${this.uri}/getWorkshop`, data);
  }

  removeFromAccepted(workshop, username) {
    const data = {
      workshop : workshop,
      username : username
    }
    return this.http.post(`${this.uri}/removeFromAccepted`, data);
  } 

  addToPending(_id, username) {
    const data = {
      username : username,
      _id : _id
    }
    return this.http.post(`${this.uri}/addToPending`, data);
  }
  
  addToWaiting(_id, username) {
    const data = {
      username : username,
      _id : _id
    }
    return this.http.post(`${this.uri}/addToWaiting`, data);
  }

  getComment(_id) {
    const data = {
      _id : _id
    }
    return this.http.post(`${this.uri}/getComment`, data);
  }

  addLike(_id, username) {
    const data = {
      username : username,
      _id : _id
    }
    return this.http.post(`${this.uri}/addLike`, data);
  }

  addComment(workshop, username, comment) {
    const data = {
      username : username,
      workshop : workshop,
      comment : comment
    }
    return this.http.post(`${this.uri}/addComment`, data);
  }

  requestToAddWorkshop(gallery, title, address, date, description_short,
    description_long, number_participants, username, status, existingPhoto = null, existingGallery = []) {
      const data = new FormData();
      gallery.forEach(element => {
        data.append("gallery", element);
      });
      existingGallery.forEach(element => {
        data.append("existingGallery[]", element);
      });
      if (existingPhoto){
        data.append("existingPhoto", existingPhoto);
      }
      data.append("title", title);
      data.append("address", address);
      data.append("date", date);
      data.append("description_short", description_short);
      data.append("description_long", description_long);
      data.append("number_participants", number_participants);
      data.append("organizer", username);
      data.append("status", status);
      return this.http.post(`${this.uri}/requestToAddWorkshop`, data);
    }

  editWorkshop(_id, gallery, title, address, date, description_short,
    description_long, number_participants, status, existingPhoto = null, existingGallery = []) {
      const data = new FormData();
      gallery.forEach(element => {
        data.append("gallery", element);
      });
      existingGallery.forEach(element => {
        data.append("existingGallery[]", element);
      });
      if (existingPhoto){
        data.append("existingPhoto", existingPhoto);
      }
      data.append("_id", _id);
      data.append("title", title);
      data.append("address", address);
      data.append("date", date);
      data.append("description_short", description_short);
      data.append("description_long", description_long);
      data.append("number_participants", number_participants);
      data.append("status", status);
      return this.http.post(`${this.uri}/editWorkshop`, data);
    }

  getPhoto(photoName){
    const data = {
      photoName : photoName
    }
    return this.http.post(`${this.uri}/getPhoto`, data, {
      responseType : 'blob',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  editWorkshopStatus(_id, status) {
    const data = {
      _id : _id,
      status : status
    }
    return this.http.post(`${this.uri}/editWorkshopStatus`, data);
  }

  uriEmail = 'http://127.0.0.1:4000/sendEmails';

  canceledWorkshop(email, title){
    const data = {
      email : email,
      title : title
    }
    return this.http.post(`${this.uriEmail}/canceledWorkshop`, data);
  }

  hasCapacity(email, title){
    const data = {
      email : email,
      title : title
    }
    return this.http.post(`${this.uriEmail}/hasCapacity`, data);
  }

  addToAccepted(_id, username){
    const data = {
      _id : _id,
      username : username
    }
    return this.http.post(`${this.uri}/addToAccepted`, data);
  }

  removeFromPending(_id, username){
    const data = {
      _id : _id,
      username : username
    }
    return this.http.post(`${this.uri}/removeFromPending`, data);
  }

  removeWorkshop(_id) {
    const data = {
      _id : _id
    }
    return this.http.post(`${this.uri}/removeWorkshop`, data);
  }
}
