import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: any;

  constructor(
    private firebase: AngularFireDatabase,
    public readonly auth: AngularFireAuth
  ) {
    this.auth.authState.subscribe(user => {
      this.currentUser = user;
      if (this.currentUser) {
        this.saveUser(this.currentUser);
      }
    });
  }

  login() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut();
  }

  saveUser(user: any) {
    const userList = this.firebase.list('user', ref => {
      return ref.orderByChild('email').equalTo(this.currentUser.email);
    });
    /*userList.push(this.currentUser);*/
  }
}
