import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{

  logged : User;
  user : User = new User();

  constructor(private route : ActivatedRoute, private userService : UsersService, private router : Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      let userUsername = param['username'];
      this.userService.getUser(userUsername).subscribe((u:User) => {
        this.user = u;

        if (this.user.profileImg != "") {
          this.userService.getImg(this.user.profileImg).subscribe((image)=>{
            let urlCreator = window.URL || window.webkitURL;
            let imageUrl = urlCreator.createObjectURL( image );
            let img: HTMLImageElement = document.querySelector( "#img" );
            img.src = imageUrl;
          })
        }
      })
    })
  }

  profileImgName : string = "Slika nije odabrana";
  img : File = null;
  messageImg : string;
  message : string = "";

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
        else {
          this.messageImg = "";
          this.profileImgName = event.target.files[0].name;
          this.img = event.target.files[0];
          let urlCreator = window.URL || window.webkitURL;
          let imageUrl = urlCreator.createObjectURL(this.img );
          let imgPreview : HTMLImageElement = document.querySelector( "#img" );
          imgPreview.src = imageUrl;
          this.user.profileImg = this.profileImgName;
        }
      }
    }
  }


  update(){
    if (!this.user.firstname) {
      this.message = "Morate uneti ime!";
      return;
    }
    if (!this.user.lastname) {
      this.message = "Morate uneti prezime!";
      return;
    }
    if (!this.user.phone) {
      this.message = "Morate uneti telefon!";
      return;
    }

    if (this.user.type == 2) {
      if (!this.user.orgName) {
        this.message = "Morate uneti naziv organizacije!";
        return;
      }

      if (!this.user.state) {
        this.message = "Morate uneti naziv države!";
        return;
      }

      if (!this.user.city) {
        this.message = "Morate uneti naziv grada!";
        return;
      }

      if (!this.user.orgName) {
        this.message = "Morate uneti naziv organizacije!";
        return;
      }

      if (!this.user.postNum) {
        this.message = "Morate uneti poštanski broj!";
        return;
      }

      if (!this.user.street) {
        this.message = "Morate uneti naziv ulice!";
        return;
      }

      if (!this.user.streetNum) {
        this.message = "Morate uneti broj u ulici!";
        return;
      }

      if (!this.user.MB) {
        this.message = "Morate uneti matični broj organizacije!";
        return;
      }
    }

    let regexTel : RegExp = /^\d{3}\/\d{3}-\d{4}$/;
    let regexPost : RegExp = /^\d{5}$/;
    
    if (!regexTel.test(this.user.phone)){
      this.message = "Telefon nije u dobrom formatu!";
      return;
    }

    if (this.user.type == 2) {
      if (!regexPost.test(this.user.postNum.toString())) {
        this.message = "Poštanski broj nije validan!";
        return;
      }

      let regexMB : RegExp = /^\d{8}$/;
      if (!regexMB.test(this.user.MB.toString())) {
        this.message = "Matični broj nije validan!";
        return;
      }
    } 

    this.userService.editUser(this.user, this.img).subscribe(resp1=>{
      if (resp1['msg'] == 'ok') {
        this.message = "";
        this.userService.getUser(this.user.username).subscribe((u:User) => {
          this.user = u;
          this.messageImg = "";
        })
      }
    })

  }

}
