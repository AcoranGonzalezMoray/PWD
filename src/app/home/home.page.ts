import { Component } from '@angular/core';
import { UserService} from "../services/user.service";
import { TextReaderService } from '../services/text-reader.service';
import { Text } from '../interfaces/text';
import { ImageLoaderService } from '../services/image-loader.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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
