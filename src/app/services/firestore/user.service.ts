import { Injectable, NgZone } from '@angular/core';
import { User } from './interfaces/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData: any;
  DisplayName: any;
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        //this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SignUp(email: string, password: string, confirmPass: string, displayName: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        //this.SendVerificationMail();
        this.DisplayName = displayName;
        this.SetUserData(result.user);
        sessionStorage.setItem('user', JSON.stringify(result.user));
        this.router.navigate(['/']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    if (sessionStorage.getItem('user')) {
      var obj = sessionStorage.getItem('user');
      obj = JSON.parse(obj!);
      console.log(obj);
      return true;
    } else {
      return false;
    }
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['dashboard']);
    });
  }

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `USUARIOS/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      userName: this.DisplayName,
      reservations: [],
      orders: [],
      phoneNumber: 0,
      role: "user",
      shoppingcart: []
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      sessionStorage.removeItem('user');
      this.router.navigate(['/']);
    });
  }
}