import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/firestore/shoppingCart.service';
import { Product } from '../services/firestore/interfaces/product';

@Component({
  selector: 'app-header-log',
  templateUrl: './header-log.component.html',
  styleUrls: ['./header-log.component.css']
})

export class HeaderLogComponent implements OnInit{
  public cart:Product[] = []
  public total:number =0.0;
  constructor(public cartService:ShoppingCartService){
  
  }
  ngOnInit(): void {
    this.cart = this.cartService.getContentCart()
  }
  carritoVisible = false;

  abrirCarrito() {
    this.totalF()
    this.carritoVisible = true;
  }
  
  cerrarCarrito() {
    this.carritoVisible = false;
  }
  vaciarCarrito(){
    
    this.cart = this.cartService.removeContentCart()
    this.totalF()
  }
  totalF(){
    this.total = 0
    this.cart.forEach(producto =>{
    this.total = this.total + parseFloat(String(producto.PVP).split('€')[0].replace(',','.'))
    })
    this.total.toFixed(2)
  }

  
}
