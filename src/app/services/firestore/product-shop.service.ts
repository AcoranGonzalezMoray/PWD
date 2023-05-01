import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Product } from './interfaces/product';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductShopService {
  constructor(
    private firestore: AngularFirestore,
  ) {}

  //Crea un nuevo producto
  public createProduct(product: Product) {
    return this.firestore.collection('ProductosTienda').add(product);
  }
  //Obtiene un producto
  public getProduct(documentId: string) {
    return this.firestore.collection('ProductosTienda').doc(documentId).valueChanges();
  }
  //Elimina un producto
  public deleteProduct(documentId: string) {
    return this.firestore.collection('ProductosTienda').doc(documentId).delete();
  }
  //Obtiene todos los productos
  public getProducts(): Observable<Product[]> {
    return this.firestore.collection<Product>('ProductosTienda').valueChanges();
  }
  //Actualiza un producto
  public updateProduct(documentId: string, product: Product) {
    return this.firestore.collection('ProductosTienda').doc(documentId).set(product);
  }
}
