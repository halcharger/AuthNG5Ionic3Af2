import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  displayName;
  email;

  constructor(public navCtrl: NavController,
    private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      console.log('auth state changed...', user);
      if (!user) {
        this.displayName = null;
        this.email = null;
        return;
      }
      this.displayName = user.displayName;
      this.email = user.email;
    });
  }

  signInWithFacebook() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => console.log(res));
  }

  signOut() {
    this.afAuth.auth.signOut();
  }
}
