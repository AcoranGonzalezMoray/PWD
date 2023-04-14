import { Injectable } from '@angular/core';
import {AngularFirestore,} from '@angular/fire/compat/firestore';
import { Product } from './interfaces/product';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {


  public cart:Product[] = []

  constructor(
    private firestore: AngularFirestore,
  ) {}


  public getContentCart(){
    var data = sessionStorage.getItem('user')
    var objeto = {uid: ''}
    if (data !== null) {
      objeto = JSON.parse(data);
      console.log(objeto.uid);
    }
    this.getProductsInRealTime(objeto.uid).subscribe((doc) => {
      if (doc.payload.exists) {
        const shoppingCart = doc.payload.get('shoppingcart');
        shoppingCart.forEach((productCart: Product)=>{
            this.cart.push(productCart)
        })
      }  
      });
    return this.cart
  }

  public updateContentCart(item:Product){
    this.cart.push(item)
    return this.cart
  }

  public removeContentCart(){
    this.cart = []
    return this.cart
  }

  public deleteContentCart(item:Product){
    console.log("entra")
    this.cart.forEach((product, index) => {
      if (product.NombreCorto === item.NombreCorto) {
        this.cart.splice(index, 1);
        return; // salir del ciclo una vez que se eliminó el producto
      }
    })
    return this.cart
  }



  //Referencia
  public reference(documentId: string) {
    return this.firestore.collection('USUARIOS').doc(documentId);
  }

  //Crea un nuevo producto del carrito
  public createProduct(product: string) {
    return this.firestore.collection('USUARIOS').add(product);
  }
  //Obtiene un producto del carrito
  public getProduct(documentId: string) {
    return this.firestore.collection('USUARIOS').doc(documentId).get();
  }
  //Elimina un producto del carrito
  public deleteProduct(documentId: string) {
    return this.firestore.collection('USUARIOS').doc(documentId).delete();
  }
  //Obtiene todos los productos del carrito
  public getProductsNotInRealTime(documentId: string) {
    return this.firestore.collection('USUARIOS').doc(documentId).get();
  }
  //Obtiene todos los productos del carrito
  public getProductsInRealTime(documentId: string) {
    return this.firestore.collection('USUARIOS').doc(documentId).snapshotChanges();
  }
  //Actualiza un producto del carrito
  public updateProduct(documentId: string, product: string) {
    return this.firestore.collection('USUARIOS').doc(documentId).set(product);
  }
}
