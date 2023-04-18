import { Component} from '@angular/core';
import { UserService } from '../services/firestore/user.service';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-app-sign-up',
  templateUrl: './app-sign-up.component.html',
  styleUrls: ['./app-sign-up.component.css']
})
export class AppSignUpComponent  {
  checkoutForm: FormGroup<any>
  notSame:boolean;

  constructor (
    public  userService: UserService,
    private formBuilder: FormBuilder
  ){
    this.notSame = false;
    this.checkoutForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', Validators.required],
      userName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]]

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
    return password === confirmPassword ? true: false;
  }
  
  
  onSubmit(): void {
    if(this.checkoutForm.valid) {
      if(!this.checkPasswords(this.checkoutForm)){
        this.notSame = true;
      }else{
        this.userService.SignUp(
          this.checkoutForm.value.email?this.checkoutForm.value.email:'', 
          this.checkoutForm.value.password?this.checkoutForm.value.password:'', 
          this.checkoutForm.value.confirmPass?this.checkoutForm.value.confirmPass:'', 
          this.checkoutForm.value.userName?this.checkoutForm.value.userName:'')
        this.checkoutForm.reset();
      }
    }
  }
}


