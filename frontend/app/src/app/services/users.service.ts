import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  uri = 'http://127.0.0.1:4000/users';

  constructor(private http: HttpClient) { }

  getUser(username){
    const data = {
      username : username
    }
    return this.http.post(`${this.uri}/getUser`, data);
  }

  getOrgAddr(id){
    const data = {
      id : id
    }
    return this.http.post(`${this.uri}/getOrgAddr`, data);
  }

  getAllComments(username){
    const data = {
      username : username
    }
    return this.http.post(`${this.uri}/getAllComments`, data);
  }

  
  removeComment(comment){
    const data = {
      comment : comment
    }
    return this.http.post(`${this.uri}/removeComment`, data);
  }

  editComment(comment){
    const data = {
      comment : comment
    }
    return this.http.post(`${this.uri}/editComment`, data);
  }

  editUser(user, profileImg){
    const data = new FormData();
    data.append("profileImg", profileImg);
    data.append("username", user.username);
    data.append("firstname", user.firstname);
    data.append("lastname", user.lastname);
    data.append("phone", user.phone);
    data.append("orgName", user.orgName);
    data.append("street", user.street);
    data.append("state", user.state);
    data.append("streetNum", user.streetNum);
    data.append("city", user.city);
    data.append("postNum", user.postNum);
    data.append("MB", user.MB);

    return this.http.post(`${this.uri}/editUser`, data);
  }

  editAddress(addr){
    const data = {
      addr : addr
    }
    return this.http.post(`${this.uri}/editAddress`, data);
  }

  getImg(imageName){
    const data = {
      imageName : imageName
    }
    return this.http.post(`${this.uri}/getImg`, data, {
      responseType : 'blob',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  getAllActiveUsers(){
    return this.http.get(`${this.uri}/getAllActiveUsers`);
  }

  getRegisterRequests() {
    return this.http.get(`${this.uri}/getRegisterRequests`);
  }

  approveReq(username){
    const data = {
      username : username
    }
    return this.http.post(`${this.uri}/approveReq`, data);
  }

  rejectReq(username){
    const data = {
      username : username
    }
    return this.http.post(`${this.uri}/rejectReq`, data);
  }

  setUserType(username, type){
    const data = {
      username : username,
      type : type
    }
    return this.http.post(`${this.uri}/setUserType`, data);
  }

  removeUser(username){
    const data = {
      username : username
    }
    return this.http.post(`${this.uri}/removeUser`, data);
  }

}
