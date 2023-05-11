import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent {

  public user = { email: '', userName: '', image: '', uid: '' }
  public contra = true
  public cambio = false
  public errorContrasena = false
  public profile!: string
  selectedFile!: File
  @Output() buttonClicked = new EventEmitter<void>();
  
  constructor(public userService: UserService, public storage: AngularFireStorage) {
    var data = sessionStorage.getItem('userData')
    data !== null ? this.user = JSON.parse(data) : null
  }

  cambiarNombre(name: string) {
    this.userService.changeName(name)
  }

  async cambiarContrasena(pw1: string, pw2: string, pw0: string) {
    if (pw1 != pw2 || pw1 == '' || pw2 == '') {
      this.contra = false
    } else {
      this.contra = true
      this.cambio = true
      this.userService.updatePassword(pw1, pw0)


    }
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {

    // Generar un nombre único para la imagen
    const imageName = `${this.user.email}`;

    // Subir la imagen a Firebase Storage
    const storageRef = this.storage.ref(`profile/${imageName}`);
    const uploadTask = storageRef.put(this.selectedFile);

    // Manejar el progreso de la carga
    uploadTask.percentageChanges().subscribe((percentage) => {
      console.log(`Imagen ${imageName} cargando: ${percentage}%`);
    });

    // Manejar la finalización de la carga
    uploadTask.snapshotChanges().subscribe((snapshot) => {
      storageRef.getDownloadURL().subscribe(url => {
        this.userService.getAfs().collection('USUARIOS').doc(this.user.uid).update({ ['image']: url }).then(()=>{
          this.user.image = url  
          sessionStorage.setItem('userData', JSON.stringify(this.user)) 
          this.buttonClicked.emit();
        });

      });
    });
  }

  onSubmitDelete(){
     this.userService.getAfs().collection('USUARIOS').doc(this.user.uid).update({ ['image']: '' }).then(()=>{
      this.user.image = ''
      sessionStorage.setItem('userData', JSON.stringify(this.user)) 
      this.buttonClicked.emit();
     })

  }

}
