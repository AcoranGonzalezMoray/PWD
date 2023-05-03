import { UserService } from '../services/firestore/user.service';
import { TextReaderService } from '../services/firestore/text-reader.service';
import { Component } from '@angular/core';
import { Text } from '../services/firestore/interfaces/text';
import { ImageLoaderService } from '../services/firestore/image-loader.service';

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.css']
})
export class AppHomeComponent {

  textoPresentacion: Text | undefined
  bpUrl : string = ''

  constructor(public userService: UserService, public textReader: TextReaderService, private imageLoader: ImageLoaderService,) {
    
    this.textReader.getTextoByTitulo('Presentacion').subscribe(textos => {
      if (textos.length > 0) {
        this.textoPresentacion = textos[0];
      }
    });
    
  }

  ngOnInit () {
    this.imageLoader.getRef('bp_card.png').getDownloadURL().subscribe(url => {
      this.bpUrl = url;
    });
  }

  
}