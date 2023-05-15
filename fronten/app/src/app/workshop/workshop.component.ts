import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../models/user';
import { Workshop } from '../models/workshop';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.css']
})
export class WorkshopComponent implements OnInit{

  @Input() workshop : Workshop;
  @Input() logged : User;

  imgSrc : string = "../../assets/workshop.jpg"

  constructor(private workshopService : WorkshopService, private sanitizer:DomSanitizer){}
  
  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnInit(): void {
    if (this.workshop.photo != "")
      this.workshopService.getPhoto(this.workshop.photo).subscribe((image) => {
        let urlCreator = window.URL || window.webkitURL;
        let imageUrl = urlCreator.createObjectURL(image);
        this.imgSrc = this.sanitize(imageUrl) as string;
      })
  }

}
