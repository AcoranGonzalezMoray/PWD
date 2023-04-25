import { Component } from '@angular/core';
import { ShoppingCartService } from '../services/firestore/shoppingCart.service';
import { Product } from '../services/firestore/interfaces/product';
@Component({
  selector: 'app-mi-reserva-producto',
  templateUrl: './mi-reserva-producto.component.html',
  styleUrls: ['./mi-reserva-producto.component.css']
})
export class MiReservaProductoComponent {
 public pedidos = [{
  UUIDV4: 'uuidv4()',
  Nombre:'user.userName',
  Productos: [{    CATEGORIA:'',
    CodBarras:'',
    FAMILIA:'',
    IMAGEN:'',
    NombreCorto:'',
    PROVEEDOR:'',
    PVP:'',
    posCode:'',}],
  Dia:'fecha',
  Hora:'hora',
  Telefono:'user.phoneNumber',
  Total: 'this.tota',
  FechaRealizacon:' Date()'
}]

 constructor(shp: ShoppingCartService){
    //shp.updateUserData()
    var data = sessionStorage.getItem('userData')
    var objeto = {uid: '', orders:[]}
    if (data !== null) objeto = JSON.parse(data);
    this.pedidos = objeto.orders
    
 }
}
