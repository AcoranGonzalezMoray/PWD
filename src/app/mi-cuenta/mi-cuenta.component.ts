import { Component } from '@angular/core';
import { UserService } from '../services/firestore/user.service';
@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent {
  public user = {email: '', userName:''}
  public contra=true
  public cambio = false
  public errorContrasena = false
  constructor(public  userService: UserService){
    var data = sessionStorage.getItem('userData')
    data !== null? this.user = JSON.parse(data):null

  }

  cambiarNombre(name:string){
    this.userService.changeName(name)
  }
 
  async cambiarContrasena(pw1:string, pw2:string, pw0:string){
      if(pw1!=pw2 ||pw1==''||pw2==''){
        this.contra = false
      }else{
        this.contra = true
        this.cambio =true
        this.userService.updatePassword(pw1,pw0)

       
      }
  }
}
