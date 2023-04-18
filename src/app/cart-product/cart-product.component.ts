import { Component, Input } from '@angular/core';
import { Product } from '../services/firestore/interfaces/product';
import { ShoppingCartService } from '../services/firestore/shoppingCart.service';
import { HeaderLogComponent } from '../header-log/header-log.component';
@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent {
  @Input() CATEGORIA="";
  @Input() CodBarras="";
  @Input() FAMILIA="";
  @Input() IMAGEN="";
  @Input() NombreCorto="";
  @Input() PROVEEDOR="";
  @Input() PVP="";
  @Input() posCode="";

 

  constructor(public cart:ShoppingCartService, public hed: HeaderLogComponent){}

  logAdd(){
    const producto :Product =  {
      CATEGORIA: this.CATEGORIA,
      CodBarras: this.CodBarras,
      FAMILIA: this.FAMILIA,
      IMAGEN: this.IMAGEN,
      NombreCorto: this.NombreCorto,
      PROVEEDOR: this.PROVEEDOR,
      PVP: this.PVP,
      posCode: this.posCode,
    }
    this.cart.updateContentCart(producto)
    this.hed.totalF()
  }

  logDelete(){
    const producto :Product =  {
      CATEGORIA: this.CATEGORIA,
      CodBarras: this.CodBarras,
      FAMILIA: this.FAMILIA,
      IMAGEN: this.IMAGEN,
      NombreCorto: this.NombreCorto,
      PROVEEDOR: this.PROVEEDOR,
      PVP: this.PVP,
      posCode: this.posCode,
    }
    this.cart.deleteContentCart(producto)
    this.hed.totalF()
  }
}
