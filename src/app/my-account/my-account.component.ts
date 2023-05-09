import { Component} from '@angular/core';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent  {

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
