import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/firestore/shoppingCart.service';
import { Product } from '../services/firestore/interfaces/product';
import { uuidv4 } from '@firebase/util';

@Component({
  selector: 'app-header-log',
  templateUrl: './header-log.component.html',
  styleUrls: ['./header-log.component.css']
})

export class HeaderLogComponent implements OnInit{
  public cart:Product[] = []
  public total:number =0.0;
  public fechaHora = true;
  public productos = true;
  constructor(public cartService:ShoppingCartService){
  
  }
  ngOnInit(): void {
    this.cart = this.cartService.getContentCart()
  }
  carritoVisible = false;

  reservar(fecha:string, hora:string){
    if(fecha=='' || hora=='' || this.cart.length==0){
      this.fechaHora = fecha==''||hora==''?false:true;
      this.productos = this.cart.length==0?false:true;
    }else{
      this.fechaHora = true
      this.productos = true
      var data = sessionStorage.getItem('userData')
      var user= {userName: '', phoneNumber: 0}
      data !== null? user = JSON.parse(data):null
      
      this.cartService.addReservation({
        UUIDV4: uuidv4(),
        Nombre:user.userName,
        Productos: this.cart,
        Dia:fecha,
        Hora:hora,
        Telefono:user.phoneNumber,
        Total: this.total,
        FechaRealizacon: Date()
    }) 
    this.cerrarCarrito()
    this.vaciarCarrito()
    }

  }

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
