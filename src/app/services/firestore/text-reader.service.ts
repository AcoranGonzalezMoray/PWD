import { Injectable } from '@angular/core';
import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Text } from './interfaces/text';

@Injectable({
  providedIn: 'root'
})
export class TextReaderService {

  private textosCollection: AngularFirestoreCollection<Text>;

  constructor(private firestore: AngularFirestore) {
    this.textosCollection = this.firestore.collection<Text>('Textos');
  }

  getTextos(): Observable<Text[]> {
    return this.textosCollection.valueChanges();
  }

  getTextoByTitulo(titulo: string) : Observable<Text[]> {
    return this.firestore.collection<Text>("Textos", ref => ref.where("Titulo", "==", titulo)).valueChanges();
  }
}
