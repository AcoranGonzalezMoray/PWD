import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';




@Component({
  selector: 'app-sing-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  checkoutForm: FormGroup<any>
  notSame: boolean;
  selectedFile!: File

  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
  ) {
    this.notSame = false;
    this.checkoutForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', Validators.required],
      userName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],


    });
  }


  checkPasswords(group: FormGroup) {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPass');

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;
    return password === confirmPassword ? true : false;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      if (!this.checkPasswords(this.checkoutForm)) {
        this.notSame = true;
      } else {
        if(this.selectedFile)this.submitWithImage()
        else{

          this.userService.SignUp(
            this.checkoutForm.value.email ? this.checkoutForm.value.email : '',
            this.checkoutForm.value.password ? this.checkoutForm.value.password : '',
            this.checkoutForm.value.confirmPass ? this.checkoutForm.value.confirmPass : '',
            this.checkoutForm.value.userName ? this.checkoutForm.value.userName : '',
            '')
          this.checkoutForm.reset();


        }
      }
    }
  }


  submitWithImage(){
    // Generar un nombre único para la imagen
    const imageName = `${this.checkoutForm.value.email}`;

    // Subir la imagen a Firebase Storage
    const storageRef = this.storage.ref(`profile/${imageName}`);
    const uploadTask = storageRef.put(this.selectedFile);

    // Manejar el progreso de la carga
    uploadTask.percentageChanges().subscribe((percentage) => {
      console.log(`Imagen ${imageName} cargando: ${percentage}%`);
    });
    var urlImage = ''
    // Manejar la finalización de la carga
    uploadTask.snapshotChanges().subscribe((snapshot) => {
      storageRef .getDownloadURL().subscribe(url => {
      // Aquí puedes enviar el archivo al servidor o procesarlo de alguna manera
      this.userService.SignUp(
        this.checkoutForm.value.email ? this.checkoutForm.value.email : '',
        this.checkoutForm.value.password ? this.checkoutForm.value.password : '',
        this.checkoutForm.value.confirmPass ? this.checkoutForm.value.confirmPass : '',
        this.checkoutForm.value.userName ? this.checkoutForm.value.userName : '',
        url)
      this.checkoutForm.reset();
      });
    });
  }
  ngOnInit() {
  }

}
