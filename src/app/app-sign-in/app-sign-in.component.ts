import { Component } from '@angular/core';
import { UserService } from '../services/firestore/user.service';
import { FormBuilder } from '@angular/forms';

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
    email: '',
    password: ''
  });
  onSubmit(): void {
    // Process checkout data here
    this.userService.SignIn(this.checkoutForm.value.email?this.checkoutForm.value.email:'', 
    this.checkoutForm.value.password?this.checkoutForm.value.password:'')

    this.checkoutForm.reset();
  }
}
