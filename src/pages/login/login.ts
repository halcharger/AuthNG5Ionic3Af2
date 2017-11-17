import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { HomePage } from '../../pages/home/home';
import { RegisterPage } from '../../pages/register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private afAuth: AngularFireAuth, private fb: Facebook, private toast: ToastController,
    private platform: Platform) {
    afAuth.authState.subscribe(user => {
      console.log('auth state changed...', user);
      if (user) {
        //user is logged on, redirect to logged in landing page...
        this.redirectToHomeOnSuccessfulLogin();
      }
    });

  }

  signInWithFacebook() {
    console.log('this.platform.is("cordova"): ', this.platform.is('cordova'));
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          console.log(res)
          this.redirectToHomeOnSuccessfulLogin();
        }).catch(e => {
          if (e.message) {
            this.toast.create({
              message: e.message,
              duration: 3000,
              showCloseButton: true
            }).present();
          }
        });
    }
  }

  signInWithGoogle() {
    return this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => {
        console.log(res)
        this.redirectToHomeOnSuccessfulLogin();
      }).catch(e => {
        if (e.message) {
          this.toast.create({
            message: e.message,
            duration: 3000,
            showCloseButton: true
          }).present();
        }
      });

  }

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      if (result) {
        console.log(result);
        await this.redirectToHomeOnSuccessfulLogin();
      }
    } catch (e) {
      if (e.message) {
        this.toast.create({
          message: e.message,
          duration: 3000,
          showCloseButton: true
        }).present();
      }
      console.log(e);
    }
  }

  async register() {
    await this.navCtrl.push(RegisterPage);
  }

  redirectToHomeOnSuccessfulLogin() {
    return this.navCtrl.setRoot(HomePage);
  }

  //This should go on the logged in pages, on this page the user is NOT logged in.
  signOut() {
    this.afAuth.auth.signOut();
  }

}
