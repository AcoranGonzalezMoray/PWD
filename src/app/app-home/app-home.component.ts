import { UserService } from '../services/firestore/user.service';
import { TextReaderService } from '../services/firestore/text-reader.service';
import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { Text } from '../services/firestore/interfaces/text';

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.css']
})
export class AppHomeComponent {

  textoPresentacion: Text | undefined

  constructor(public userService: UserService, public textReader: TextReaderService) {
    
    this.textReader.getTextoByTitulo('Presentacion').subscribe(textos => {
      if (textos.length > 0) {
        this.textoPresentacion = textos[0];
      }
    });
    
  }

  
}