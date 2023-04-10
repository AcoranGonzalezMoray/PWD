import { Component } from '@angular/core';
import { UserService } from '../services/firestore/user.service';
@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.css']
})
export class AppHomeComponent {
  constructor (
    public  userService: UserService,
  ){}
}
