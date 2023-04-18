import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
//instalar e importar toPromise() con npm i rxjs-compat --save


@Injectable({
  providedIn: 'root'
})
export class ImageLoaderService {

  constructor(
    private storage: AngularFireStorage,
  ) { }

  getRef(imageName : string) {
    return this.storage.ref(imageName)
  }

  async loadImage(imageName: string) {

    const storageRef = this.storage.ref(imageName);
    try {
      const url = await storageRef.getDownloadURL().toPromise();
      return url;
    } catch (error) {
      console.log(error);
      return null;
    }

  }
}
