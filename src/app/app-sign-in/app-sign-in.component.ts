import { Component } from '@angular/core';
import { UserService } from '../services/firestore/user.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-app-sign-in',
  templateUrl: './app-sign-in.component.html',
  styleUrls: ['./app-sign-in.component.css']
})

export class AppSignInComponent {
  constructor (
    public  userService: UserService,
    private formBuilder: FormBuilder
  ){}

  checkoutForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  onSubmit(): void {
    if(this.checkoutForm.valid){
        this.userService.SignIn(this.checkoutForm.value.email?this.checkoutForm.value.email:'', 
        this.checkoutForm.value.password?this.checkoutForm.value.password:'')
        this.checkoutForm.reset();
    }
  }
}
