import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { OrderByDirection } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  public cantidadDocs: number = 0;
  private lastDocument: any;
  public productList: any[]  = [];

  constructor(private firestore: AngularFirestore,) { }


  async getFirstquery(coleccion:string,field:string,query:string, order:string){
    console.log(order)
    var order1 = order.split('.')[0]
    const direction: OrderByDirection = order.endsWith('.desc') ? 'desc' : 'asc';
    const fieldDuplicate = field=='NombreCorto' && order1== 'NombreCorto' ? true : false;
    query = query.toLocaleUpperCase()
    var response;
    if(!fieldDuplicate){
       response =await this.firestore.collection(coleccion).ref.where(field,'>=',query).where(field,'<=',query+ "\uf8ff").orderBy(field).orderBy(order1, direction).limit(10).get();
    }else{
      response =await this.firestore.collection(coleccion).ref.where(field,'>=',query).where(field,'<=',query+ "\uf8ff").orderBy(order1, direction).limit(10).get();
    }
    const data = response.docs;
    this.cantidadDocs = data.length;
    this.lastDocument = data[data.length - 1];
    this.productList = data.map(doc => doc.data());
    return this.productList;
  }
  async getNextquery(coleccion:string,field:string,query:string, order:string) {
    // 10 siguientes
    var order1 = order.split('.')[0]
    const direction: OrderByDirection = order.endsWith('.desc') ? 'desc' : 'asc';
    const fieldDuplicate = field=='NombreCorto' && order1== 'NombreCorto' ? true : false;
    query = query.toLocaleUpperCase()
    var response2;
    if(!fieldDuplicate){
       response2 =await this.firestore.collection(coleccion).ref.where(field,'>=',query).where(field,'<=',query+ "\uf8ff").orderBy(field).orderBy(order1, direction).startAfter(this.lastDocument).limit(10).get();
    }else{
      response2 =await this.firestore.collection(coleccion).ref.where(field,'>=',query).where(field,'<=',query+ "\uf8ff").orderBy(order1, direction).startAfter(this.lastDocument).limit(10).get();
    }
    const data2 = response2.docs;
    this.cantidadDocs += data2.length;
    if (data2.length > 0) {
      this.lastDocument = data2[data2.length - 1];
      this.productList = [...this.productList, ...data2.map(doc => doc.data())];
    } else {
      console.log("No hay más documentos");
    }
    console.log('new last document:', this.lastDocument.data());

    return this.productList;
  }

  async getFirstDocuments(coleccion:string,order:string) {
    // 10 primeros
    var order1 = order.split('.')[0]
    const direction: OrderByDirection = order.endsWith('.desc') ? 'desc' : 'asc';
    const response =await this.firestore.collection(coleccion).ref.orderBy(order1, direction).limit(10).get();;
    const data = response.docs;
    this.cantidadDocs = data.length;
    this.lastDocument = data[data.length - 1];
    this.productList = data.map(doc => doc.data());
    return this.productList;
  }

  async getNextDocuments(coleccion:string,order:string) {
    // 10 siguientes
    var order1 = order.split('.')[0]
    const direction: OrderByDirection = order.endsWith('.desc') ? 'desc' : 'asc';
    console.log('last document:', this.lastDocument.data());
    const response2 = await this.firestore.collection(coleccion).ref.orderBy(order1, direction).startAfter(this.lastDocument).limit(10).get();
    const data2 = response2.docs;
    this.cantidadDocs += data2.length;
    if (data2.length > 0) {
      this.lastDocument = data2[data2.length - 1];
      this.productList = [...this.productList, ...data2.map(doc => doc.data())];
    } else {
      console.log("No hay más documentos");
    }
    console.log('new last document:', this.lastDocument.data());

    return this.productList;
  }
 
}
