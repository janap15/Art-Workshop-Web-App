import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  constructor(private route : ActivatedRoute, private userService : UsersService, private router: Router) {}

  logged : User;
  message : string = "";
  profileImgName : string = "Slika nije odabrana";
  img : File = null;
  messageImg : string;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (localStorage.getItem("logged") != null) {
        this.logged = JSON.parse(localStorage.getItem("logged"));

        if (this.logged.profileImg != "") {
          this.userService.getImg(this.logged.profileImg).subscribe((image)=>{
            let urlCreator = window.URL || window.webkitURL;
            let imageUrl = urlCreator.createObjectURL( image );
            let img: HTMLImageElement = document.querySelector( "#img" );
            img.src = imageUrl;
          });
        }
      }
    })
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
        else {
          this.messageImg = "";
          this.profileImgName = event.target.files[0].name;
          this.img = event.target.files[0];
          let urlCreator = window.URL || window.webkitURL;
          let imageUrl = urlCreator.createObjectURL(this.img );
          let imgPreview : HTMLImageElement = document.querySelector( "#img" );
          imgPreview.src = imageUrl;
          this.logged.profileImg = this.profileImgName;
        }
      }
    }
  }


  update(){
    if (!this.logged.firstname) {
      this.message = "Morate uneti ime!";
      return;
    }
    if (!this.logged.lastname) {
      this.message = "Morate uneti prezime!";
      return;
    }
    if (!this.logged.phone) {
      this.message = "Morate uneti telefon!";
      return;
    }

    if (this.logged.type == 2) {
      if (!this.logged.orgName) {
        this.message = "Morate uneti naziv organizacije!";
        return;
      }

      if (!this.logged.state) {
        this.message = "Morate uneti naziv države!";
        return;
      }

      if (!this.logged.city) {
        this.message = "Morate uneti naziv grada!";
        return;
      }

      if (!this.logged.orgName) {
        this.message = "Morate uneti naziv organizacije!";
        return;
      }

      if (!this.logged.postNum) {
        this.message = "Morate uneti poštanski broj!";
        return;
      }

      if (!this.logged.street) {
        this.message = "Morate uneti naziv ulice!";
        return;
      }

      if (!this.logged.streetNum) {
        this.message = "Morate uneti broj u ulici!";
        return;
      }

      if (!this.logged.MB) {
        this.message = "Morate uneti matični broj organizacije!";
        return;
      }
    }

    let regexTel : RegExp = /^\d{3}\/\d{3}-\d{4}$/;
    let regexPost : RegExp = /^\d{5}$/;
    
    if (!regexTel.test(this.logged.phone)){
      this.message = "Telefon nije u dobrom formatu!";
      return;
    }

    if (this.logged.type == 2) {
      if (!regexPost.test(this.logged.postNum.toString())) {
        this.message = "Poštanski broj nije validan!";
        return;
      }

      let regexMB : RegExp = /^\d{8}$/;
      if (!regexMB.test(this.logged.MB.toString())) {
        this.message = "Matični broj nije validan!";
        return;
      }
    } 

    this.userService.editUser(this.logged, this.img).subscribe(resp1=>{
      if (resp1['msg'] == 'ok') {
        this.message = "";
        this.userService.getUser(this.logged.username).subscribe((u:User) => {
          this.logged = u;
          localStorage.setItem("logged", JSON.stringify(u));
          this.messageImg = "";
        })
      }
    })
  }


}
