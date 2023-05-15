import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  uri = 'http://127.0.0.1:4000/register';

  constructor(private http: HttpClient) { }

  register(username, password, firstname, lastname, phone, email, orgName, state, city, post, street, streetNum, MB, type, status){
    const data = {
      username : username,
      password : password,
      firstname : firstname,
      lastname : lastname, 
      phone : phone,
      email : email, 
      orgName : orgName,
      state : state,
      city : city,
      post : post,
      street : street,
      streetNum : streetNum,
      MB : MB,
      type : type,
      status : status
    }

    return this.http.post(`${this.uri}/register`, data);
  }

  registerWithProfileImg(username, password, firstname, lastname, phone, email, orgName, state, city, post, street, streetNum, MB, type, status, profileImg){
    const data = new FormData();
    data.append("username", username);
    data.append("password", password);
    data.append("firstname", firstname);
    data.append("lastname", lastname);
    data.append("phone", phone);
    data.append("email", email);
    data.append("orgName", orgName);
    data.append("state", state);
    data.append("city", city);
    data.append("post", post);
    data.append("street", street);
    data.append("streetNum", streetNum);
    data.append("MB", MB);
    data.append("type", type);
    data.append("status", status);
    data.append("profileImg", profileImg);

    return this.http.post(`${this.uri}/registerWithProfileImg`, data);
  }

  getUser(username, email){
    const data = {
      username : username,
      email : email
    }

    return this.http.post(`${this.uri}/getUser`, data);
  }
}
