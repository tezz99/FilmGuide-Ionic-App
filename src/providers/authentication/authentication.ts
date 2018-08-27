import { FirestoreProvider } from "./../firestore/firestore";
import { User } from "../../models/user.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {
    authState = null;

    constructor(
        private http: HttpClient,
        private afAuth: AngularFireAuth,
        private firestore: FirestoreProvider
    ) {
        console.log("Hello AuthenticationProvider Provider");
        afAuth.authState.subscribe(state => {
            this.authState = state;
        });
    }

    isAuthenticated(): boolean {
        return this.authState;
    }

    // ASYNC needed here?
    login(user: User) {
        return this.afAuth.auth
            .signInWithEmailAndPassword(user.email, user.password)
            .then(usr => {
                this.authState = usr;
            });
    }

    // ASYNC needed here?
    register(user: User) {
        return this.afAuth.auth
            .createUserAndRetrieveDataWithEmailAndPassword(
                user.email,
                user.password
            )
            .then(usr => {
                this.authState = usr;
                //this.firestore.addUser(this.getUserID, user.username);
                return usr;
            });
    }

    getUserID(): string {
        return this.afAuth.auth.currentUser.uid;
    }

    getUserEmail(): string {
        return "Fixme: Email Here";

        // if (this.isAuthenticated() && this.afAuth.auth.currentUser.email) {
        //     return this.afAuth.auth.currentUser.email;
        // } else {
        //     return "Email Here";
        // }
    }

    //Sign user out of
    logout() {
        this.afAuth.auth.signOut();
    }
}
