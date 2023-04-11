import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {
  @Input() category = "";
  @Input() subcategories : { Subcategoria: String; }[] | undefined;
  constructor(){
    console.log(this.subcategories)
  }
}
