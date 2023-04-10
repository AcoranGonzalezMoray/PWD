import { Component } from '@angular/core';
import { UserService } from '../services/firestore/user.service';
@Component({
  selector: 'app-app-what-we-do',
  templateUrl: './app-what-we-do.component.html',
  styleUrls: ['./app-what-we-do.component.css']
})
export class AppWhatWeDoComponent {
  constructor (
    public  userService: UserService,
  ){}
}
