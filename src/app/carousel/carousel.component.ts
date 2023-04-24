import { Component } from '@angular/core';
import { TextReaderService } from '../services/firestore/text-reader.service';
import { Text } from '../services/firestore/interfaces/text';
import { UserService } from '../services/firestore/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ImageLoaderService } from '../services/firestore/image-loader.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})

export class CarouselComponent {
  imagenes : string[] = []

  constructor (private storage: AngularFireStorage,
    private imageLoader: ImageLoaderService,) {

  }

  ngOnInit() {
    this.imageLoader.getRef('carouselActive.jpg').getDownloadURL().subscribe(url => {
      this.imagenes.push(url);
    });
    this.imageLoader.getRef('chocolatesVentana.jpg').getDownloadURL().subscribe(url => {
      this.imagenes.push(url);
    });
    this.imageLoader.getRef('instalaciones.jpg').getDownloadURL().subscribe(url => {
      this.imagenes.push(url);
    });
    console.log(this.imagenes[1])
    
  }
}
