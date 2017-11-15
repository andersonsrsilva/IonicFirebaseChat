import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {SigninPage} from '../pages/signin/signin';
import {User} from "../models/user.model";
import {AuthProvider} from "../providers/auth/auth";
import {UserProvider} from "../providers/user/user";
import {FirebaseAuthState} from "angularfire2";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = SigninPage;
  currentUser: User;

  constructor(authProvider: AuthProvider,
              userProvider: UserProvider,
              platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen) {

    authProvider.auth
      .subscribe((authState: FirebaseAuthState) => {
        if (authState) {
          userProvider.currentUser
            .subscribe((user: User) => {
              this.currentUser = user;
            });
        }
      })

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

