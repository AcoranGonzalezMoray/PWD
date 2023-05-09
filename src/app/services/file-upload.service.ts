import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize, Observable} from "rxjs";
import { FileUpload} from "../interfaces/file-upload/file-upload.module"
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private basePath = '/uploads';
  private storage: any;
  private filesCollection: AngularFirestoreCollection<FileUpload>;
  constructor(private firestore: AngularFirestore, storage: AngularFireStorage) {
    this.storage = storage;
    this.filesCollection = firestore.collection<FileUpload>(this.basePath);
  }

  pushFileToStorage(fileUpload: FileUpload): Observable<number| undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(finalize(() => {
      storageRef.getDownloadURL().subscribe((downloadURL: string) => {
        fileUpload.url = downloadURL;
        fileUpload.name = fileUpload.file.name;
        this.saveFileData(fileUpload);
      });
    })).subscribe();
    return uploadTask.percentageChanges();
  }

  getFiles(numFiles: number): Observable<FileUpload[]> {
    return this.filesCollection
      .valueChanges({ limitToLast: numFiles });
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private saveFileData(fileUpload: FileUpload): Promise<void> {
    const jsonData = JSON.parse(JSON.stringify(fileUpload));
    return this.filesCollection.add(jsonData).then(docRef => {
      const docId = docRef.id;
      return docRef.set({ ...jsonData, key: docId });
    });
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.filesCollection.doc(key).delete();
  }
  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}