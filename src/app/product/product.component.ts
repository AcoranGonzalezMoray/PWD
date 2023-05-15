import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../interfaces/product';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() CATEGORIA="";
  @Input() CodBarras="";
  @Input() FAMILIA="";
  @Input() IMAGEN="";
  @Input() NombreCorto="";
  @Input() PROVEEDOR="";
  @Input() PVP="";
  @Input() posCode="";


  constructor( public cart:ShoppingCartService, public routes:Router,private navCtrl: NavController) { }


  log(){
    if(sessionStorage.getItem('user')){
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
    }else{
      this.routes.navigate(['sign-in'])

    }
  }

  ver() {
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
    sessionStorage.setItem('productDetail', JSON.stringify(producto))
    this.routes.navigate(['/product-detail'])
  }

}
