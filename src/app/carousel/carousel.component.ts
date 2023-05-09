import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ImageLoaderService } from '../services/image-loader.service';
import { Observable, forkJoin, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent  implements OnInit {

  imagenes: string[] = []
  imagenActivaIndex = 0
  imageNumber = 9

  constructor (private storage: AngularFireStorage, private imageLoader: ImageLoaderService,) {}

  async ngOnInit() {

    const imagenesNames = [lastValueFrom(this.imageLoader.getRef('carouselActive.jpg').getDownloadURL()),
      lastValueFrom(this.imageLoader.getRef('chocolatesVentana.jpg').getDownloadURL()),
      lastValueFrom(this.imageLoader.getRef('instalaciones.jpg').getDownloadURL()),
      lastValueFrom(this.imageLoader.getRef('estanteria1.jpg').getDownloadURL()),
      lastValueFrom(this.imageLoader.getRef('estanteria2.jpg').getDownloadURL()),
      lastValueFrom(this.imageLoader.getRef('estanteria3.jpg').getDownloadURL()),
      lastValueFrom(this.imageLoader.getRef('pan.jpg').getDownloadURL()),
      lastValueFrom(this.imageLoader.getRef('pulido.jpg').getDownloadURL()),
      lastValueFrom(this.imageLoader.getRef('taller.jpg').getDownloadURL()),]

    try {
      const urls = await Promise.all(imagenesNames);
      this.imagenes = urls;
      console.log(this.imagenes[0]); // aquí la variable imágenes ya tiene los valores
    } catch (error) {
      console.log('Error al cargar las imágenes', error);
    }
    console.log(this.imagenes[0])
    console.log(this.imagenes[1])
  }

  cambiarImagenActiva(direccion: number) {
    if (this.isInRange(this.imagenActivaIndex + direccion )) {
      this.imagenActivaIndex += direccion;
      return
    }

    if (this.imagenActivaIndex + direccion == this.imageNumber) {
      this.imagenActivaIndex = 0
      return
    }
    this.imagenActivaIndex = this.imageNumber -1
  }

  isInRange(imageIndex : number) {
    if (imageIndex < this.imageNumber && imageIndex >= 0) return true
    return false
  }

}
