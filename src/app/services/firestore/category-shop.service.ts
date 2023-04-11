import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryShopService {
  constructor(
    private firestore: AngularFirestore,
  ) {}
  

  //Crea un nuevo producto
  public createCategory(category:string) {
    return this.firestore.collection('CategoriasTienda').add(category);
  }
  //Obtiene un producto
  public getCategory(documentId: string) {
    return this.firestore.collection('CategoriasTienda').doc(documentId).snapshotChanges();
  }
  //Elimina un producto
  public deleteCategory(documentId: string) {
    return this.firestore.collection('CategoriasTienda').doc(documentId).delete();
  }
  //Obtiene todos los productos
  public getCategories() {
    return this.firestore.collection('CategoriasTienda').snapshotChanges();
  }
  //Actualiza un producto
  public updateCategory(documentId: string, product: string) {
    return this.firestore.collection('CategoriasTienda').doc(documentId).set(product);
  }
}
