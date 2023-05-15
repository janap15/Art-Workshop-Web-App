import { AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { Comment } from '../models/comment';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit{

  @Input() comment : Comment;
  @Input() i : number;

  imgId : string;

  constructor(private workshopService : WorkshopService, private userService : UsersService){}


  ngOnInit(): void {

    this.comment.timestamp = new Date(this.comment.timestamp);
    this.imgId = this.comment._id;
    this.userService.getUser(this.comment.user).subscribe((user : User) => {
      if (user.profileImg != "") {
          this.userService.getImg(user.profileImg).subscribe((image) => {
          let urlCreator = window.URL || window.webkitURL;
          let imageUrl = urlCreator.createObjectURL(image);
          let img : HTMLImageElement = document.querySelectorAll(".commment-component-image").item(this.i) as HTMLImageElement;
          img.src = imageUrl;
        })
      }
      else {
        let img : HTMLImageElement = document.querySelectorAll(".commment-component-image").item(this.i) as HTMLImageElement;
        img.src = "../../assets/avatar-icon.png";
      }
    })
    
  }

}
