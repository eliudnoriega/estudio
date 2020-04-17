import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: any;

  constructor(
    public readonly auth: AngularFireAuth
  ) {
    this.auth.authState.subscribe(user => {
        this.currentUser = user;
    });
  }

  login() {
    this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.auth.signOut();
  }
}
