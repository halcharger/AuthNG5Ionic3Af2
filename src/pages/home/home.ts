import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '../../models/user';
import { LoginPage } from "../../pages/login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user = {} as User;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth) {
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data){
        this.user = new User(data);
      }
    });
  }

  async signOut() {
    try {
      await this.afAuth.auth.signOut();
      this.navCtrl.setRoot(LoginPage);
    } catch (e) {
      console.log(e);
    }
  }
}
