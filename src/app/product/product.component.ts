import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() category="";
  @Input() barCode="";
  @Input() family="";
  @Input() img="";
  @Input() shortName="";
  @Input() supplier="";
  @Input() pvp= "";
  @Input() posCode="";
  
  constructor() { }
}
