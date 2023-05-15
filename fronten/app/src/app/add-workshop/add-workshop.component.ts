import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-add-workshop',
  templateUrl: './add-workshop.component.html',
  styleUrls: ['./add-workshop.component.css']
})
export class AddWorkshopComponent implements OnInit {

  constructor(private workshopService : WorkshopService, private sanitizer : DomSanitizer, 
    private router : Router) { }

  title : string;
  address : string;
  description_short : string;
  description_long : string;
  message : string;
  minDate : Date;
  inputDate : Date;
  inputTime : string;
  number_participants : number;

  logged : User = new User();

  ngOnInit(): void {
    if (localStorage.getItem("logged") != null) {
      this.logged = JSON.parse(localStorage.getItem("logged"));
    }
    const currentDate = new Date();
    this.minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  }

  mainImgName : string = "Slika nije odabrana";
  img : File = null;
  messageImg : string;
  uploadedImg : boolean = false;

  mainImgUpload(event: any){
    if (event.target.files && event.target.files[0]) {
      let imgUploaded = new Image();
      imgUploaded.src = window.URL.createObjectURL(event.target.files[0]);
      this.messageImg = "";
      this.mainImgName = event.target.files[0].name;
      this.img = event.target.files[0];

      let urlCreator = window.URL || window.webkitURL;
      let imageUrl = urlCreator.createObjectURL( this.img );
      let img: HTMLImageElement = document.querySelector( "#img" );
      img.src = imageUrl;

      this.uploadedImg = true;
    }
  }

  images : File[] = [];
  galleryImgSrcs : string[] = []; 
  existingImages : string[] = [];
  existingGalleryImgSrcs : string[] = []; 
  messageGalleryImg : string;

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  galleryImgUpload(event: any){
    if (event.target.files) {
      if (event.target.files.length > 5) {
        this.messageGalleryImg = "Možete uneti najviše 5 slika!";
      }
      else {
        this.messageGalleryImg = "";
        for (let file of event.target.files) {
          let urlCreator = window.URL || window.webkitURL;
          let imageUrl = urlCreator.createObjectURL(file);
          this.galleryImgSrcs.push(this.sanitize(imageUrl) as string);    
          this.images.push(file);
        }
      }
    }
  }

  jsonFileName : string = "";
  messageJSON : string = "";
  jsonMainPhoto : string = "";

  JSONUpload(event : any){
    if (event.target.files) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.addEventListener('load', (event) => {
        // @ts-ignore
        let object = JSON.parse(event.target.result);
        
        this.title = object['title'];
        this.address = object['address'];
        this.description_short = object['description_short'];
        this.description_long = object['description_long'];

        let dateTime = new Date(object['date']);
        this.inputTime = dateTime.getHours().toString().padStart(2, '0') + ":" + dateTime.getMinutes().toString().padStart(2, '0');
        this.inputDate = dateTime;
   
        this.number_participants = object['number_participants'];

        this.workshopService.getPhoto(object['photo']).subscribe(image => {
          let urlCreator = window.URL || window.webkitURL;
          let imageUrl = urlCreator.createObjectURL(image);
          let img: HTMLImageElement = document.querySelector( "#img" );
          img.src = imageUrl;
          this.jsonMainPhoto = object['photo'];
          this.messageImg = object['photo'];
          this.uploadedImg = false;
        })

        this.existingImages = [];
        this.existingGalleryImgSrcs = [];
        object['gallery'].forEach(el=>{
          this.workshopService.getPhoto(el).subscribe(image => {
            let urlCreator = window.URL || window.webkitURL;
            let imageUrl = urlCreator.createObjectURL(image);
            this.existingGalleryImgSrcs.push(this.sanitize(imageUrl) as string);
            this.existingImages.push(el);
          })
        })
        this.uploadedImg = false;
      });
      reader.readAsText(file);
    }
  }

  add() {
    if (!this.img && !this.jsonMainPhoto) {
      this.message = "Morate uneti glavnu sliki!";
      return;
    }
    if (!this.title) {
      this.message = "Morate uneti naziv radionice!";
      return;
    }
    if (!this.address) {
      this.message = "Morate uneti adresu radionice!";
      return;
    }
    if (!this.inputDate) {
      this.message = "Morate uneti datum održavanja radionice!";
      return;
    }
    if (!this.inputTime) {
      this.message = "Morate uneti vreme održavanja radionice!";
      return;
    }
    if (!this.description_short) {
      this.message = "Morate uneti kratak opis radionice!";
      return;
    }
    if (!this.description_long) {
      this.message = "Morate uneti duži opis radionice!";
      return;
    }
    if (!this.number_participants) {
      this.message = "Morate uneti maksimalan broj učesnika na radionici!";
      return;
    }
    this.message = "";

    let hm = this.inputTime.split(":");
    let myDate :Date = new Date(this.inputDate.getFullYear(), this.inputDate.getMonth(), this.inputDate.getDate(),
                      parseInt(hm[0]), parseInt(hm[1]), 0, 0);

    let existingPhoto;
    if (this.uploadedImg == true){
      this.images.unshift(this.img);
      existingPhoto = null;
    }
    else {
      existingPhoto = this.jsonMainPhoto;
    }
    this.workshopService.requestToAddWorkshop(this.images, this.title, this.address, myDate, this.description_short,
      this.description_long, this.number_participants, this.logged.username, 'organizator_zahtev', existingPhoto, this.existingImages).subscribe(resp => {
        if (resp['msg'] != 'ok') alert("error");
      })
    
  }

  removeGalleryImg(ix){
    this.images.splice(ix, 1);
    this.galleryImgSrcs.splice(ix, 1);
  }

  removeExistingGalleryImg(ix){
    this.existingImages.splice(ix, 1);
    this.existingGalleryImgSrcs.splice(ix, 1);
  }
}
