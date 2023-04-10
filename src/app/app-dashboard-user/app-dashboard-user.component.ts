import { Component } from '@angular/core';
import { UserService } from '../services/firestore/user.service';
@Component({
  selector: 'app-app-dashboard-user',
  templateUrl: './app-dashboard-user.component.html',
  styleUrls: ['./app-dashboard-user.component.css']
})
export class AppDashboardUserComponent {
  constructor (
    public  userService: UserService,
  ){}
}
