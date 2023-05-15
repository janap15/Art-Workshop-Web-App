import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  uri = 'http://127.0.0.1:4000/login';

  constructor(private http: HttpClient) { }

  login(username, password){
    const data = {
      username : username,
      password : password
    }

    return this.http.post(`${this.uri}/login`, data);
  }

  getUser(username){
    const data = {
      username : username
    }

    return this.http.post(`${this.uri}/getUser`, data);
  }
}
