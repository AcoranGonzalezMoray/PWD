import { Component } from '@angular/core';
import { UserService } from '../services/firestore/user.service';

@Component({
  selector: 'app-app-sign-up',
  templateUrl: './app-sign-up.component.html',
  styleUrls: ['./app-sign-up.component.css']
})
export class AppSignUpComponent {
  constructor (
    public  userService: UserService,
  ){}
}


