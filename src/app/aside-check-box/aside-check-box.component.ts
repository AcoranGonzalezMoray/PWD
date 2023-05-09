import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-aside-check-box',
  templateUrl: './aside-check-box.component.html',
  styleUrls: ['./aside-check-box.component.scss']
})
export class AsideCheckBoxComponent {
  @Input() DESCRIPCION = "pRUEBA";
  @Input() CODIGO = "";
  @Input() PVP = "";
  @Output () checkResponse: EventEmitter< string | null | undefined> = new EventEmitter();
  constructor(){
  }

  checkTrue(txt:string | null | undefined){
    this.checkResponse.emit(txt)
  }
}