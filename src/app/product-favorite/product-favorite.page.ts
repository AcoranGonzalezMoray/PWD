import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-favorite',
  templateUrl: './product-favorite.page.html',
  styleUrls: ['./product-favorite.page.scss'],
})
export class ProductFavoritePage implements OnInit {
  public productListSql: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(public sql: SqliteService, public routes: Router) { 
  }

  ngOnInit() {
    this.productListSql = this.sql.products
  }


  deleteProduct(product: Product){
    this.sql.deletefavouriteProduct(product.posCode)
  }
  
  viewDetail(product: Product){
    sessionStorage.setItem('productDetail', JSON.stringify(product))
    this.routes.navigate(['/product-detail'])
  }
}
