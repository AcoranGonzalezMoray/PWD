import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import 'bootstrap';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {}

  navigationLink(page:string)
  {
     this.navCtrl.navigateRoot(page)
  } 
}
