import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/firestore/user.service';
import { ProductShopService } from '../services/firestore/product-shop.service';
import { Product } from '../services/firestore/interfaces/product';
import { CategoryShopService } from '../services/firestore/category-shop.service';
@Component({
  selector: 'app-app-store',
  templateUrl: './app-store.component.html',
  styleUrls: ['./app-store.component.css']
})
export class AppStoreComponent{
  public products:any[] = [];
  public categories:any[] = [];
  
  constructor(
    public userService: UserService,
    public productShopService: ProductShopService,
    public categoryShopService: CategoryShopService
  ) { 
    if(!localStorage.getItem("productShop")){
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
          localStorage.setItem("productShop", JSON.stringify(this.products))
        })
      });
    }
    if(!localStorage.getItem("categoriesShop")){
      this.categoryShopService.getCategories().subscribe((catsSnapshot) => {
        this.categories = [];
  
        catsSnapshot.forEach((catData: any) => {
          this.categories.push(
            {
              category:catData.payload.doc.data().Categoria,
              subcategory:catData.payload.doc.data().Subcategorias
            }
          );
          localStorage.setItem("categoriesShop", JSON.stringify(this.categories))
        })
      });
    }
    if(localStorage.getItem("productShop") && localStorage.getItem("categoriesShop") ){
      let tmp:any;
      tmp = localStorage.getItem("productShop")
      this.products =JSON.parse(tmp);
      tmp = localStorage.getItem("categoriesShop")
      this.categories =JSON.parse(tmp);
    } 
  }
}
