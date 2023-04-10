import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/firestore/user.service';
import { ProductShopService } from '../services/firestore/product-shop.service';
import { Product } from '../services/firestore/interfaces/product';
@Component({
  selector: 'app-app-store',
  templateUrl: './app-store.component.html',
  styleUrls: ['./app-store.component.css']
})
export class AppStoreComponent{
  public products:any[] = [];
  
  constructor(
    public userService: UserService,
    public productShopService: ProductShopService
  ) { 
    this.productShopService.getProducts().subscribe((catsSnapshot) => {
      this.products = [];
      let product:Product;

      catsSnapshot.forEach((catData: any) => {
        this.products.push(
          product = {
            category:catData.payload.doc.data().CATEGORIA,
            barCode:catData.payload.doc.data().CodBarras,
            family:catData.payload.doc.data().FAMILIA,
            img:catData.payload.doc.data().IMAGEN,
            shortName:catData.payload.doc.data().NombreCorto,
            supplier:catData.payload.doc.data().PROVEEDOR,
            pvp: catData.payload.doc.data().PVP,
            posCode:catData.payload.doc.data().posCode
          }
        );
      })
    });
  }

}
