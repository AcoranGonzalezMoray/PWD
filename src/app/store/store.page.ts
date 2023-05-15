import { Component, OnInit} from '@angular/core';
import { UserService } from '../services/user.service';
import { ProductShopService } from '../services/product-shop.service';
import { CategoryService } from '../services/category.service';
import { PaginationService } from '../services/pagination.service';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product';

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
    private sqlite: SQLite
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




  //SERVICIO SQLITE
  private storage!: SQLiteObject;
  public productListSql: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  ionViewDidEnter() {
    this.getProducts(); 
  }

  async getProducts() {
    this.storage = await this.sqlite.create({
      name: 'mydbProducts.db',
      location: 'default'
    });
    this.storage.executeSql('DROP TABLE IF EXISTS favouriteProductsTable', [])
    this.storage.executeSql('CREATE TABLE IF NOT EXISTS favouriteProductsTable( NombreCorto varchar(255) PRIMARY KEY, CATEGORIA varchar(255), FAMILIA varchar(255),IMAGEN varchar(255), CodBarras varchar(255),PROVEEDOR varchar(255), PVP varchar(255), posCode varchar(255))', [])
    this.storage.executeSql('SELECT * FROM favouriteProductsTable', []).then(res => { this.pushProduct(res) });
  }

  pushProduct(res: any) {
    let items: Product[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      items.push({
        CATEGORIA: res.rows.item(i).CATEGORIA,
        CodBarras: res.rows.item(i).CodBarras,
        FAMILIA: res.rows.item(i).FAMILIA,
        IMAGEN: res.rows.item(i).IMAGEN,
        NombreCorto: res.rows.item(i).NombreCorto,
        posCode: res.rows.item(i).posCode,
        PROVEEDOR: res.rows.item(i).PROVEEDOR,
        PVP: res.rows.item(i).PVP,
      });
    }
    this.productListSql.next(items);
  }

  addProduct(CodBarras: string, CATEGORIA: string, FAMILIA: string, IMAGEN: string, NombreCorto: string,
    PROVEEDOR: string, PVP: string, posCode: string) {
    // validation
    if (!CodBarras.length || !CATEGORIA.length || !FAMILIA.length || !IMAGEN.length || !NombreCorto.length
      || !PROVEEDOR.length || !PVP.length || !posCode.length) {
      alert('Provide CodBarras, CATEGORIA, FAMILIA, IMAGEN, NombreCorto, PROVEEDOR, PVP, posCode');
      return;
    }
    this.storage.executeSql(`INSERT INTO favouriteProductsTable (NombreCorto, CATEGORIA, FAMILIA, IMAGEN, codBarras, PROVEEDOR, PVP, posCode) VALUES ('${NombreCorto}', '${CATEGORIA}', '${FAMILIA}', '${IMAGEN}', '${CodBarras}', '${PROVEEDOR}', '${PVP}', '${posCode}')`, [])
      .then(() => {
        alert("Success");
        this.storage.executeSql('SELECT * FROM favouriteProductsTable', []).then(res => { this.pushProduct(res) });
      }, (e) => { alert(JSON.stringify(e.err)); });
  }

  deletefavouriteProduct(CodBarras: string) {
    this.storage.executeSql(`
      DELETE FROM favouriteProductsTable WHERE CodBarras = ${CodBarras}`, [])
      .then(() => {
        alert("User deleted!");
        this.storage.executeSql('SELECT * FROM favouriteProductsTable', []).then(res => { this.pushProduct(res) });
      })
      .catch(e => {
        alert(JSON.stringify(e))
      });
  }









}
