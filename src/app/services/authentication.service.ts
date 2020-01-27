import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../entities/user.class';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isLoggedIn = false;

  constructor(
    private afAuth: AngularFireAuth
  ) { }


 async  logIn(user: User) {
   const result = await
   this.afAuth.auth.
   signInWithEmailAndPassword(user.email, user.password);

   if (result.user) {
     this.isLoggedIn = true;
   }

   return result;

  }

  logOut() {

    if ( this.afAuth.auth.currentUser ) {
      this.isLoggedIn = false;
      return this.afAuth.auth.signOut();
    }
  }

  authenticated(): boolean {
    return this.isLoggedIn;
  }

}
