import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product';


@Component({
  selector: 'app-test-sqlite',
  templateUrl: './test-sqlite.page.html',
  styleUrls: ['./test-sqlite.page.scss'],
})

export class TestSqlitePage {
  private storage!: SQLiteObject;
  productList: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private sqlite: SQLite) { }

  ionViewDidEnter() {
    //this.getProducts(); 
    
  }

  async getProducts() {
    this.storage = await this.sqlite.create({
      name: 'mydbProducts.db',
      location: 'default'
    });
    this.storage.executeSql('DROP TABLE IF EXISTS favouriteProductsTable', [])
    this.storage.executeSql('CREATE TABLE IF NOT EXISTS favouriteProductsTable( CodBarras varchar(255) PRIMARY KEY, CATEGORIA varchar(255), FAMILIA varchar(255),IMAGEN varchar(255), NombreCorto varchar(255),PROVEEDOR varchar(255), PVP varchar(255), posCode varchar(255))', [])
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
    this.productList.next(items);
  }

  addProduct(CodBarras: string, CATEGORIA: string, FAMILIA: string, IMAGEN: string, NombreCorto: string,
    PROVEEDOR: string, PVP: string, posCode: string) {
    // validation
    if (!CodBarras.length || !CATEGORIA.length || !FAMILIA.length || !IMAGEN.length || !NombreCorto.length
      || !PROVEEDOR.length || !PVP.length || !posCode.length) {
      alert('Provide CodBarras, CATEGORIA, FAMILIA, IMAGEN, NombreCorto, PROVEEDOR, PVP, posCode');
      return;
    }
    this.storage.executeSql(`INSERT INTO favouriteProductsTable (codBarras, CATEGORIA, FAMILIA, IMAGEN, NombreCorto, PROVEEDOR, PVP, posCode) VALUES ('${CodBarras}', '${CATEGORIA}', '${FAMILIA}', '${IMAGEN}', '${NombreCorto}', '${PROVEEDOR}', '${PVP}', '${posCode}')`, [])
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

  get getProductList() {
    return this.productList
  }
}
