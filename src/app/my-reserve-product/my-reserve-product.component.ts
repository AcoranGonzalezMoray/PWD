import { Component} from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-my-reserve-product',
  templateUrl: './my-reserve-product.component.html',
  styleUrls: ['./my-reserve-product.component.scss'],
})
export class MyReserveProductComponent  {

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
