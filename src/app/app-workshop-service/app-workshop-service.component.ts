import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CategoryService } from '../services/firestore/category.service';
import { UserService } from '../services/firestore/user.service';
import { ShoppingCartService } from '../services/firestore/shoppingCart.service';
import { uuidv4 } from '@firebase/util';
import { Router} from '@angular/router';
@Component({
  selector: 'app-app-workshop-service',
  templateUrl: './app-workshop-service.component.html',
  styleUrls: ['./app-workshop-service.component.css']
})
export class AppWorkshopServiceComponent implements OnInit {
  public categories: any[] = [];
  selected:any
  checked:string| null | undefined
  constructor(
    public userService: UserService,
    public categoryShopService: CategoryService,
    public cartService: ShoppingCartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoriesLoad()
  }

  showCategoryMov(i:boolean){
    const aside:any = document.querySelector("#serviciosTaller")
    i?aside.style="display:block;":aside.style="display:none;"
  }


  reservar(fecha:string, hora:string, servicio:string, MarcaModelo:string){

    this.log()
    if(fecha=='' || hora=='' || servicio=='' || MarcaModelo=='' ){

    }else{

      var data = sessionStorage.getItem('userData')
      var user= {userName: '', phoneNumber: 0}
      data !== null? user = JSON.parse(data):null

      this.cartService.addReservation({
        UUIDV4: uuidv4(),
        Nombre:user.userName,
        Servicio: servicio,
        Vehiculo: MarcaModelo,
        Dia:fecha,
        Hora:hora,
        Telefono:user.phoneNumber,
        FechaRealizacon: Date()
      })
      //this.router.navigate(['/dashboard'])

    }

  }

  select(selected:Date | null | undefined) {
    console.log(selected)
    this.selected = selected?.toDateString()
  }

  check(txt:string | null | undefined){
    const checkboxes = document.querySelectorAll('.category input.form-check-input');
    checkboxes.forEach((checkbox:any) => { checkbox.name != txt?checkbox.checked = false:null});
    this.checked =txt
  }

  categoriesLoad() {
    if (!localStorage.getItem("categoriesService")) {
      this.categoryShopService.getCategoriesInRealTime('ServiciosTaller').subscribe((catsSnapshot) => {
        this.categories = [];

        catsSnapshot.forEach((catData: any) => {
          this.categories.push(
            {
              CODIGO: catData.payload.doc.data().Codigo,
              DESCRIPCION: catData.payload.doc.data().Descripcion,
              PVP: catData.payload.doc.data().PVP,
            }
          );
          localStorage.setItem("categoriesService", JSON.stringify(this.categories))
        })
      });
    }
    if (localStorage.getItem("categoriesService")) {
      let tmp: any;
      tmp = localStorage.getItem("categoriesService")
      this.categories = JSON.parse(tmp);
    }
  }


  log(){
    sessionStorage.getItem('user')?null:this.router.navigate(['iniciar-sesion'])
  }
}
