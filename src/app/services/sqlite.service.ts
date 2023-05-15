import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product';
@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  constructor( public sqlite: SQLite) { 
    this.getProducts(); 
  }
  //SERVICIO SQLITE
  private storage!: SQLiteObject;
  public productListSql: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  ionViewDidEnter() {
   
  }

  async getProducts() {
    this.storage = await this.sqlite.create({
      name: 'mydbProducts.db',
      location: 'default'
    });
  
    //this.storage.executeSql('DROP TABLE IF EXISTS favouriteProductsTable', [])
    this.storage.executeSql('CREATE TABLE IF NOT EXISTS favouriteProductsTable(posCode  varchar(255) PRIMARY KEY, CATEGORIA varchar(255), FAMILIA varchar(255),IMAGEN varchar(255), CodBarras varchar(255),PROVEEDOR varchar(255), PVP varchar(255),NombreCorto  varchar(255))', [])
    //this.storage.executeSql(`INSERT INTO favouriteProductsTable (posCode , CATEGORIA, FAMILIA, IMAGEN, codBarras, PROVEEDOR, PVP, NombreCorto) VALUES ('1','2','3','4','5','6','7', '8')`, [])
    //.then(() => {
      //this.storage.executeSql('SELECT * FROM favouriteProductsTable', []).then(res => { this.pushProduct(res) });
    //}, (e) => { alert(JSON.stringify(e.err)); });
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
      
        this.storage.executeSql('SELECT * FROM favouriteProductsTable', []).then(res => { this.pushProduct(res) });
      }, (e) => { alert(JSON.stringify(e.err)); });
  }

  deletefavouriteProduct(posCode: string) {
    this.storage.executeSql(`
      DELETE FROM favouriteProductsTable WHERE posCode = ${posCode}`, [])
      .then(() => {
       
        this.storage.executeSql('SELECT * FROM favouriteProductsTable', []).then(res => { this.pushProduct(res) });
      })
      .catch(e => {
        alert(JSON.stringify(e))
      });
  }

  async existfavouriteProduct(posCode: string) {
 
      const res = await this.storage.executeSql(`
        SELECT * FROM favouriteProductsTable WHERE posCode = ${posCode}`, []);

      if (res.rows.length > 0) {
        return true; // existe un producto favorito con el posCode especificado
      } else {
        return false; // no existe ningún producto favorito con el posCode especificado
      }

  }


  get products(){
    return this.productListSql
  }

}
