import { Component} from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-my-reserve-service',
  templateUrl: './my-reserve-service.component.html',
  styleUrls: ['./my-reserve-service.component.scss'],
})
export class MyReserveServiceComponent {

  public pedidos = [{
    UUIDV4: 'uuidv4()',
    Nombre:'user.userName',
    Servicio: 'servicio',
    Vehiculo: 'MarcaModelo',
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
