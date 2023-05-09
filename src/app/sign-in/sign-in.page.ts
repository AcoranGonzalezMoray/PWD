import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService} from "../services/user.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  constructor(public  userService: UserService, private formBuilder: FormBuilder) {}

  ngOnInit() {
  }

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
