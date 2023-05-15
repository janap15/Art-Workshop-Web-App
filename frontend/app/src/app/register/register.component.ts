import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { RegisterService } from '../services/register.service';
import sizeOf from 'image-size';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor(private registerService : RegisterService, private router: Router) {}

  logged : string = "";

  ngOnInit(): void {
  }

  firstname: string = "";
  username: string = "";
  lastname: string = "";
  password: string = "";
  passwordAgain: string = "";
  phone: string = "";
  email: string = "";
  message : string = "";

  org : boolean = false;
  orgName : string = "";
  state : string = "";
  city : string = "";
  post : string = "";
  street: string = "";
  number : number;
  MB : string = ""; 
  profileImgName : string = "Slika nije odabrana";
  img : File = null;
  messageImg : string;

  onclick() {
    this.org = !this.org;
  }

  profileImgUpload(event: any){
    if (event.target.files && event.target.files[0]) {
      
      let imgUploaded = new Image();
      imgUploaded.src = window.URL.createObjectURL(event.target.files[0]);
      imgUploaded.onload = () => {
        if(imgUploaded.width > 300 || imgUploaded.height > 300 || 
          imgUploaded.width < 100 || imgUploaded.height < 100 ){
          this.messageImg = "Dimenzije slike moraju biti minimalno 100x100, a maksimalno 300x300!";
          this.profileImgName = "";
          return;
        }
      }

      this.message = "";
      this.profileImgName = event.target.files[0].name;
      this.img = event.target.files[0];
    }
  }

  register(){
    if (!this.firstname) {
      this.message = "Morate uneti ime!";
      return;
    }
    if (!this.lastname) {
      this.message = "Morate uneti prezime!";
      return;
    }
    if (!this.username) {
      this.message = "Morate uneti korisničko ime!";
      return;
    }
    if (!this.password) {
      this.message = "Morate uneti lozinku!";
      return;
    }
    if (!this.passwordAgain) {
      this.message = "Morate uneti ponovljenu lozinku!";
      return;
    }
    if (!this.phone) {
      this.message = "Morate uneti telefon!";
      return;
    }
    if (!this.email) {
      this.message = "Morate uneti email!";
      return;
    }

    let regexPass : RegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    let regexTel : RegExp = /^\d{3}\/\d{3}-\d{4}$/;
    let regexEmail : RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    this.registerService.getUser(this.username, this.email).subscribe((u : User) =>{
      if (u) {
        if (u.username == this.username) this.message = "Korisničko ime već postoji!";
        else if (u.email == this.email) this.message = "Email adresa je već iskorišćena!";
        return;
      }
      else {
        if (!regexPass.test(this.password)) {
          this.message = "Lozinka nije u dobrom formatu!";
          return;
        }
        else {
          if (!(this.password === this.passwordAgain)) {
            this.message = "Ponovljena lozinka mora biti ista!";
            return;
          }
        }

        if (!regexTel.test(this.phone)){
          this.message = "Telefon nije u dobrom formatu!";
          return;
        }

        if (!regexEmail.test(this.email)) {
          this.message = "Email nije u dobrom formatu!";
          return;
        }

        if (this.org) {
          if (!this.orgName) {
            this.message = "Morate uneti naziv organizacije!";
            return;
          }

          if (!this.state) {
            this.message = "Morate uneti naziv države!";
            return;
          }

          if (!this.city) {
            this.message = "Morate uneti naziv grada!";
            return;
          }

          if (!this.orgName) {
            this.message = "Morate uneti naziv organizacije!";
            return;
          }

          if (!this.post) {
            this.message = "Morate uneti poštanski broj!";
            return;
          }

          if (!this.street) {
            this.message = "Morate uneti naziv ulice!";
            return;
          }

          if (!this.number) {
            this.message = "Morate uneti broj u ulici!";
            return;
          }

          if (!this.MB) {
            this.message = "Morate uneti matični broj organizacije!";
            return;
          }

          let regexPost : RegExp = /^\d{5}$/;
          if (!regexPost.test(this.post)) {
            this.message = "Poštanski broj nije validan!";
            return;
          }

          let regexMB : RegExp = /^\d{8}$/;
          if (!regexMB.test(this.MB)) {
            this.message = "Matični broj nije validan!";
            return;
          }
        } 

        let type = 1;
        if (this.org) type = 2;

        if (this.img != null) {
          this.registerService.registerWithProfileImg(this.username, this.password, this.firstname, this.lastname, this.phone, 
            this.email, this.orgName, this.state, this.city, parseInt(this.post), this.street, this.number, this.MB, type, "obrada", this.img).subscribe(res => {
              if (res['msg'] != 'ok') alert('error');
            })
        }
        else {
        this.registerService.register(this.username, this.password, this.firstname, this.lastname, this.phone, 
          this.email, this.orgName, this.state, this.city, parseInt(this.post), this.street, this.number, this.MB, type, "obrada").subscribe(res => {
            if (res['msg'] != 'ok') alert('error');
          })
        }

        this.message = "Sve ok!";
      }
    })
  }

}
