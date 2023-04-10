import { Component } from '@angular/core';
import { UserService } from '../services/firestore/user.service';
@Component({
  selector: 'app-app-sign-in',
  templateUrl: './app-sign-in.component.html',
  styleUrls: ['./app-sign-in.component.css']
})
export class AppSignInComponent {
  constructor (
    public  userService: UserService,
  ){}
}
