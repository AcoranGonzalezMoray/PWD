import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CategoryService } from '../services/firestore/category.service';
import { UserService } from '../services/firestore/user.service';
@Component({
  selector: 'app-app-workshop-service',
  templateUrl: './app-workshop-service.component.html',
  styleUrls: ['./app-workshop-service.component.css']
})
export class AppWorkshopServiceComponent implements OnInit {
  public categories: any[] = [];
  selected:Date | null | undefined
  checked:string| null | undefined
  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>| undefined
  constructor(
    public userService: UserService,
    public categoryShopService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoriesLoad()
  }

  select(selected:Date | null | undefined) {
    console.log(selected)
    this.selected = selected
  }

  check(txt:string | null | undefined){
    if(this.checkboxes){
      console.log(this.checkboxes)
      this.checkboxes.forEach((checkbox: ElementRef) => {
        console.log(checkbox)
        if (checkbox.nativeElement.type === 'checkbox') {
        checkbox.nativeElement.checked = true;
        }
      });
    }
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
}
