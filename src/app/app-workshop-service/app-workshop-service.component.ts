import { Component } from '@angular/core';
import { UserService } from '../services/firestore/user.service';
@Component({
  selector: 'app-app-workshop-service',
  templateUrl: './app-workshop-service.component.html',
  styleUrls: ['./app-workshop-service.component.css']
})
export class AppWorkshopServiceComponent {
  constructor (
    public  userService: UserService,
  ){}
}
