import { Component } from '@angular/core';
import { UserService } from '../services/firestore/user.service';
@Component({
  selector: 'app-app-workshop-store',
  templateUrl: './app-workshop-store.component.html',
  styleUrls: ['./app-workshop-store.component.css']
})
export class AppWorkshopStoreComponent {
  constructor (
    public  userService: UserService,
  ){}
}
