import { TextReaderService } from '../services/firestore/text-reader.service';
import { Component, inject } from '@angular/core';
import { Text } from '../services/firestore/interfaces/text';
import { UserService } from '../services/firestore/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ImageLoaderService } from '../services/firestore/image-loader.service';



export class AppHomeComponent { }

@Component({
  selector: 'app-app-what-we-do',
  templateUrl: './app-what-we-do.component.html',
  styleUrls: ['./app-what-we-do.component.css']
})
export class AppWhatWeDoComponent {

  imageUrl: string = ''
  textoQueHacemos: Text | undefined

  constructor(
    public userService: UserService,
    private storage: AngularFireStorage,
    private imageLoader: ImageLoaderService,
    public textReader: TextReaderService
  ) {

    this.textReader.getTextoByTitulo('QueHacemos').subscribe(textos => {
      if (textos.length > 0) {
        this.textoQueHacemos = textos[0];
      }
    });
  }
  async ngOnInit() {
    this.imageLoader.getRef('imagenHome.jpg').getDownloadURL().subscribe(url => {
      this.imageUrl = url;
    });

    //this.imageUrl = await this.imageLoader.loadImage('imagenHome.jpg')
  }
}
