import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  product!: Product;

  constructor(private route: ActivatedRoute) { 
    var tmp = sessionStorage.getItem('productDetail')
    this.product = JSON.parse(tmp!)
  }

  ngOnInit() {
    var tmp = sessionStorage.getItem('productDetail')
    this.product = JSON.parse(tmp!)
  }
}
