import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../entities/user.class';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }


   logIn(user: User) {

      return this.afAuth.auth.
      signInWithEmailAndPassword(user.email, user.password);

  }

  logOut() {

    if ( this.afAuth.auth.currentUser ) {
          return this.afAuth.auth.signOut();
    }
  }

}
