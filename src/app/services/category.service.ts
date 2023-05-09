import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(
    private firestore: AngularFirestore,
  ) {}
  

  //crea una categoria
  public createCategory(colec:string,category:string) {
    return this.firestore.collection(colec).add(category);
  }
  //Obtiene una categoria
  public getCategory(colec:string,documentId: string) {
    return this.firestore.collection(colec).doc(documentId).get();
  }
  //Elimina una categoria
  public deleteCategory(colec:string,documentId: string) {
    return this.firestore.collection(colec).doc(documentId).delete();
  }
  //Obtiene todos las categorias
  public getCategoriesNotInRealTime(colec:string) {
      return this.firestore.collection(colec).get();
    }
  //Obtiene todos las categorias
  public getCategoriesInRealTime(colec:string) {
    return this.firestore.collection(colec).snapshotChanges();
  }
  //Actualiza una cateogria
  public updateCategory(colec:string,documentId: string, category: string) {
    return this.firestore.collection(colec).doc(documentId).set(category);
  }
}