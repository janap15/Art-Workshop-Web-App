import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordchangeService {

  uri = 'http://127.0.0.1:4000/passwordChange';

  constructor(private http: HttpClient) { }

  reqPasswordChange(email){
    const data = {
      email : email
    }

    return this.http.post(`${this.uri}/requestPasswordChange`, data);
  }

  
  passwordChange(username, password){
    const data = {
      username : username,
      password : password
    }

    return this.http.post(`${this.uri}/passwordChange`, data);
  }

  hasActiveToken(username) {
    const data = {
      username : username
    }

    return this.http.post(`${this.uri}/hasActiveToken`, data);
  }
}
