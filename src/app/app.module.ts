import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {SignupPage} from '../pages/signup/signup';

import {AngularFireModule, FirebaseAppConfig} from 'angularfire2';
import {UserProvider} from '../providers/user/user.provider';
import {AuthProvider} from '../providers/auth/auth.provider';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyBVzJrecxPITUBZ91S0L9JRlmWdeeqLxC0",
  authDomain: "ionic2-firebase-chat-c13b0.firebaseapp.com",
  databaseURL: "https://ionic2-firebase-chat-c13b0.firebaseio.com",
  storageBucket: "ionic2-firebase-chat-c13b0.appspot.com",
  messagingSenderId: "160084383993"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    AuthProvider
  ]
})
export class AppModule {
}