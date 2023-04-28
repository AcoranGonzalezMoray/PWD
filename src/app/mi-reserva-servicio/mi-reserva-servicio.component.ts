
import { Component } from '@angular/core';
import { ShoppingCartService } from '../services/firestore/shoppingCart.service';
import { Product } from '../services/firestore/interfaces/product';

@Component({
  selector: 'app-mi-reserva-servicio',
  templateUrl: './mi-reserva-servicio.component.html',
  styleUrls: ['./mi-reserva-servicio.component.css']
})

export class MiReservaServicioComponent {
 public pedidos = [{
  UUIDV4: 'uuidv4()',
  Nombre:'user.userName',
  Servicio: 'servicio',
  MarcaModelo: 'MarcaModelo',
  Dia:'fecha',
  Hora:'hora',
  Telefono:'user.phoneNumber',
  FechaRealizacon: 'Date()'
}]

 constructor(shp: ShoppingCartService){
    //shp.updateUserData()
    var data = sessionStorage.getItem('userData')
    var objeto = {uid: '', reservations:[]}
    if (data !== null) objeto = JSON.parse(data);
    this.pedidos = objeto.reservations
    
 }
}
