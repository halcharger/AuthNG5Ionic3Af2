// import { Injectable } from "@angular/core";
// import { User } from "../models/user";
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { AngularFireAuth } from "angularfire2/auth";
// import { AngularFireDatabase } from "angularfire2/database";
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/switchMap';

// import * as firebase from 'firebase/app';


// @Injectable()
// export class AuthService {

//     user: BehaviorSubject<User> = new BehaviorSubject(null);

//     constructor(private afAuth: AngularFireAuth, private afDb: AngularFireDatabase) {
//         this.afAuth.authState.switchMap(auth => {
//             if (auth) {
//                 ///signed in
//                 return this.afDb.object('/users' + auth.uid);
//             } else {
//                 return Observable.of(null);
//             }
//         }).subscribe(user => this.user.next(user))
//     }

//     ///// SignIn - SignOut Process /////
//     googleLogin() {
//         const provider = new firebase.auth.GoogleAuthProvider()
//         return this.afAuth.auth.signInWithPopup(provider)
//             .then(credential => {
//                 this.updateUser(credential.user)
//             })
//     }

//     signOut() {
//         this.afAuth.auth.signOut()
//     }
    
//     //// Update user data ////
//     /// updates database with user info after login
//     /// only runs if user role is not already defined in database
//     private updateUser(authData) {
//         const userData = new User(authData)
//         const ref = this.afDb.object('users/' + authData.uid)
//         ref.take(1)
//             .subscribe(user => {
//                 if (!user.role) {
//                     ref.update(userData)
//                 }
//             })
//     }
// }