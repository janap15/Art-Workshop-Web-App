import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { Workshop } from '../models/workshop';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-edit-workshop',
  templateUrl: './edit-workshop.component.html',
  styleUrls: ['./edit-workshop.component.css']
})
export class EditWorkshopComponent {

  constructor(private route : ActivatedRoute, private workshopService : WorkshopService, private sanitizer : DomSanitizer,
     private router : Router) { }

  logged : User;

  message : string;
  minDate : Date;
  inputDate : Date;
  inputTime : string;
  workshop : Workshop = new Workshop();
  time : string;

  mainImgName : string = "Slika nije odabrana";
  img : File = null;
  messageImg : string;
  uploadedImg : boolean = false;
  
  images : File[] = [];
  galleryImgSrcs : string[] = []; 
  existingImages : string[] = [];
  existingGalleryImgSrcs : string[] = []; 
  messageGalleryImg : string;


  ngOnInit(): void {
    if (localStorage.getItem("logged") != null) {
      this.logged = JSON.parse(localStorage.getItem("logged"));
    }
    const currentDate = new Date();
    this.minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    this.route.params.subscribe(param => {
      let _id = param['_id'];
      this.workshopService.getWorkshop(_id).subscribe((w : Workshop) => {
        this.workshop = w;
        let dateTime = new Date(this.workshop.date);
        this.time = dateTime.getHours().toString().padStart(2, '0') + ":" + dateTime.getMinutes().toString().padStart(2, '0');
        this.inputDate = new Date(this.workshop.date);
        this.inputTime = this.time;

        if (this.workshop.photo != "") {
          this.workshopService.getPhoto(this.workshop.photo).subscribe((image)=>{
            let urlCreator = window.URL || window.webkitURL;
            let imageUrl = urlCreator.createObjectURL( image );
            let img: HTMLImageElement = document.querySelector( "#img" );
            img.src = imageUrl;
          });
        }

        this.existingImages = [];
        this.existingGalleryImgSrcs = [];
        this.workshop.gallery.forEach(el=>{
          this.workshopService.getPhoto(el).subscribe(image => {
            let urlCreator = window.URL || window.webkitURL;
            let imageUrl = urlCreator.createObjectURL(image);
            this.existingGalleryImgSrcs.push(this.sanitize(imageUrl) as string);
            this.existingImages.push(el);
          })
        })
      })
    })
  }

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

  edit(){
    // if (!this.img && !this.workshop.photo) {
    //   this.message = "Morate uneti glavnu sliki!";
    //   return;
    // }
    if (!this.workshop.title) {
      this.message = "Morate uneti naziv radionice!";
      return;
    }
    if (!this.workshop.address) {
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
    if (!this.workshop.description_short) {
      this.message = "Morate uneti kratak opis radionice!";
      return;
    }
    if (!this.workshop.description_long) {
      this.message = "Morate uneti duži opis radionice!";
      return;
    }
    if (!this.workshop.number_participants) {
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
      existingPhoto = this.workshop.photo;
    }

    this.workshopService.editWorkshop(this.workshop._id, this.images, this.workshop.title, this.workshop.address, myDate, this.workshop.description_short,
      this.workshop.description_long, this.workshop.number_participants, this.workshop.status, existingPhoto, this.existingImages).subscribe(resp => {
        if (resp['msg'] != 'ok') alert("error");
      })
    

  }

  acceptUser(user){
    this.workshopService.addToAccepted(this.workshop._id, user).subscribe(resp => {
      if (resp['msg'] != 'ok') alert('error');
      this.workshopService.removeFromPending(this.workshop._id, user).subscribe(resp2 => {
        if (resp2['msg'] != 'ok') alert('error');
        this.workshopService.getWorkshop(this.workshop._id).subscribe((shop : Workshop)=>{
          this.workshop = shop;
        }) 
      })
    })
  }

  
  saveJSON(){
    let blob = new Blob([JSON.stringify(this.workshop)], { type: 'application/json' });
    let fakeButton = document.createElement('a');
 
    fakeButton.href = URL.createObjectURL(blob);
    fakeButton.download = 'workshop';

    document.body.appendChild(fakeButton);
    fakeButton.click();
    document.body.removeChild(fakeButton);
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
