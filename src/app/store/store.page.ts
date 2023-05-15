import { Component, OnInit} from '@angular/core';
import { UserService } from '../services/user.service';
import { ProductShopService } from '../services/product-shop.service';
import { CategoryService } from '../services/category.service';
import { PaginationService } from '../services/pagination.service';


@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  public products: any[] = [];
  public categories: any[] = [];
  public queryBoolean: boolean = false;
  public CategoryBoolean: boolean = false;
  public productList: any[] = [];
  private orderValue: string = 'CodBarras.asc';
  private coleccion: string = '';
  private field: string = '';
  private queryText: string = '';
  private scrollDepthTriggered = false;

  constructor(
    public userService: UserService,
    public productShopService: ProductShopService,
    public categoryShopService: CategoryService,
    public paginationService: PaginationService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.productList = [...await this.paginationService.getFirstDocuments('ProductosTienda', this.orderValue)];
    this.categoriesLoad()
  }

  showCategoryMov(i: boolean) {
    const aside: any = document.querySelector("#aside")
    i ? aside.style = "display:block;" : aside.style = "display:none;"
  }

  async logScrolling($event:any) {
    // only send the event once
    if(this.scrollDepthTriggered) {return;}
    if($event.target.localName != "ion-content") {return;}

    const scrollElement = await $event.target.getScrollElement();
    const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;
    const currentScrollDepth = scrollElement.scrollTop;
    const targetPercent = 99;
    let triggerDepth = ((scrollHeight / 100) * targetPercent);

    if(currentScrollDepth > triggerDepth) {
       // Establecer la bandera de carga en progreso
      this.scrollDepthTriggered= true;
      if (this.queryBoolean) {
        this.productList = [...await this.paginationService.getNextquery(this.coleccion, this.field, this.queryText, this.orderValue)];
      } else {
        this.productList = [...await this.paginationService.getNextDocuments('ProductosTienda', this.orderValue)];
      }
       // Establecer la bandera de carga en progreso
      this.scrollDepthTriggered= false;
    }
  }



  async selectLoad(order: Event) {
    const inputElement = order.target as HTMLInputElement;
    this.orderValue = inputElement.value;
    this.productList = []
    if (this.queryBoolean) {
      this.productList = [...await this.paginationService.getFirstquery(this.coleccion, this.field, this.queryText, this.orderValue)];
    } else {
      this.productList = [...await this.paginationService.getFirstDocuments('ProductosTienda', this.orderValue)];
    }

  }

  async queryFunc(coleccion: string, field: string, query: string) {
    this.productList = [...await this.paginationService.getFirstquery(coleccion, field, query, this.orderValue)];
    this.coleccion = coleccion
    this.field = field
    this.queryText = query
    this.queryBoolean = true;
  }
  async CategoryFunc(coleccion: string, field: string, query: string) {
    this.productList = [...await this.paginationService.getFirstquery(coleccion, field, query, this.orderValue)];
    this.coleccion = coleccion
    this.field = field
    this.queryText = query
    this.queryBoolean = true;
  }

  categoriesLoad() {
    if (!localStorage.getItem("categoriesShop")) {
      this.categoryShopService.getCategoriesInRealTime('CategoriasTienda').subscribe((catsSnapshot) => {
        this.categories = [];

        catsSnapshot.forEach((catData: any) => {
          this.categories.push(
            {
              category: catData.payload.doc.data().Categoria,
              subcategory: catData.payload.doc.data().Subcategorias
            }
          );
          localStorage.setItem("categoriesShop", JSON.stringify(this.categories))
        })
      });
    }
    if (localStorage.getItem("categoriesShop")) {
      let tmp: any;
      tmp = localStorage.getItem("categoriesShop")
      this.categories = JSON.parse(tmp);
    }
  }
  async reload() {
    this.productList = [...await this.paginationService.getFirstDocuments('ProductosTienda', this.orderValue)];
    this.queryBoolean = false;
  }
  updateCategory(Category: string) {
    this.CategoryFunc('ProductosTienda', 'CATEGORIA', Category);
  }











}
