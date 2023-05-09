import { Component, OnInit } from '@angular/core';

import { TextReaderService } from 'src/app/services/text-reader.service';
import { Text } from 'src/app/interfaces/text';
import { UserService } from 'src/app/services/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ImageLoaderService } from 'src/app/services/image-loader.service';

@Component({
  selector: 'app-what-we-do',
  templateUrl: './what-we-do.page.html',
  styleUrls: ['./what-we-do.page.scss'],
})

export class WhatWeDoPage implements OnInit {

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
    this.imageLoader.getRef('instalaciones.jpg').getDownloadURL().subscribe(url => {
      this.imageUrl = url;
    });

  }

}
