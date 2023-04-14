import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from '../services/firestore/user.service';
import { ProductShopService } from '../services/firestore/product-shop.service';
import { CategoryService } from '../services/firestore/category.service';
import { PaginationService } from '../services/firestore/pagination.service';

@Component({
  selector: 'app-app-store',
  templateUrl: './app-store.component.html',
  styleUrls: ['./app-store.component.css']
})
export class AppStoreComponent implements OnInit {
  public products: any[] = [];
  public categories: any[] = [];
  public queryBoolean: boolean = false;
  public CategoryBoolean: boolean = false;
  public productList: any[] = [];
  private loading = false;
  private orderValue: string = 'CodBarras.asc';
  private coleccion: string = '';
  private field: string = '';
  private queryText: string = '';

  constructor(
    public userService: UserService,
    public productShopService: ProductShopService,
    public categoryShopService: CategoryService,
    public paginationService: PaginationService
  ) { }

  async ngOnInit(): Promise<void> {
    this.productList = [...await this.paginationService.getFirstDocuments('ProductosTienda', this.orderValue)];
    this.categoriesLoad()
  }


  @HostListener('window:scroll', ['$event'])
  async onScroll(event: any) {
    if (this.bottomReached() && !this.loading) {
      if (this.queryBoolean) {
        this.productList = [...await this.paginationService.getNextquery(this.coleccion, this.field, this.queryText, this.orderValue)];
      } else {
        this.productList = [...await this.paginationService.getNextDocuments('ProductosTienda', this.orderValue)];
      }
    }
  }

  bottomReached(): boolean {
    const scrollY = window.scrollY;
    const visibleHeight = document.documentElement.clientHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const bottomOfPage = visibleHeight + scrollY >= pageHeight;

    return bottomOfPage || pageHeight < visibleHeight;
  }


  async selectLoad(order: Event) {
    const inputElement = order.target as HTMLInputElement;
    this.orderValue = inputElement.value;
    this.productList = []
    if(this.queryBoolean){
      this.productList = [...await this.paginationService.getFirstquery(this.coleccion, this.field, this.queryText, this.orderValue)];
    }else{
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
