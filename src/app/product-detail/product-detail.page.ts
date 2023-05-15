import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../interfaces/product';
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  product!: Product;
  exist = false
  constructor(private route: ActivatedRoute, private sql: SqliteService) { 
    var tmp = sessionStorage.getItem('productDetail')
    this.product = JSON.parse(tmp!)
  }

  ngOnInit() {
    var tmp = sessionStorage.getItem('productDetail')
    this.product = JSON.parse(tmp!)

    this.sql.existfavouriteProduct(this.product.posCode).then((res) => {
      this.exist = res ? res.valueOf() : false;
    });
    

  }

  addFavourite(){
    this.sql.addProduct(this.product.CodBarras, this.product.CATEGORIA, this.product.FAMILIA, this.product.IMAGEN, this.product.NombreCorto, this.product.PROVEEDOR, this.product.PVP, this.product.posCode)
    this.exist = true
  }

  deleteProduct(){
    this.sql.deletefavouriteProduct(this.product.posCode)
    this.exist = false
  }
}
