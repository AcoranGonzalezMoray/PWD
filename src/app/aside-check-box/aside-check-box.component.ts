import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-aside-check-box',
  templateUrl: './aside-check-box.component.html',
  styleUrls: ['./aside-check-box.component.css']
})
export class AsideCheckBoxComponent {
  @Input() DESCRIPCION = "pRUEBA";
  @Input() CODIGO = "";
  @Input() PVP = "";

  constructor(){
    console.log(this.DESCRIPCION)
  }
}
