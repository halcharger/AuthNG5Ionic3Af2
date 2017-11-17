import { Roles } from "./roles";

export class User {
    email: string;
    password: string;
    displayName: string;
    uid: string;
    loginProvider: string;
    photoUrl: string;
    roles:Roles;

    constructor(data){
        this.email = data.email;
        this.displayName = data.displayName;
        this.uid = data.uid;
        this.loginProvider = data.providerData[0].providerId;
        this.photoUrl = data.photoURL;
    }
}