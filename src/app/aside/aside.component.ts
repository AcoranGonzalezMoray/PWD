import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationService } from '../services/pagination.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent {
  @Input() category = "";
  @Input() subcategories : { Subcategoria: String; }[] | undefined;
  @Output() cambioLista = new EventEmitter<string>();


  constructor(public paginationService: PaginationService){
  }
  async handleClick(id: string) {
    this.cambioLista.emit(id);
  }

}
