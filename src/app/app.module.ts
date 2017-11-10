import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {SignupPage} from '../pages/signup/signup';

import {AngularFireModule, AuthMethods, AuthProviders, FirebaseAppConfig} from 'angularfire2';
import {UserProvider} from '../providers/user/user.provider';
import {AuthProvider} from '../providers/auth/auth.provider';
import {SigninPage} from '../pages/signin/signin';
import {CustomLoggedHeaderComponent} from '../components/custom-logged-header/custom-logged-header.component';
import {CapitalizePipe} from '../pipes/capitalize/capitalize';
import {ChatPage} from '../pages/chat/chat';
import {ChatProvider} from '../providers/chat/chat.provider';


const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyBVzJrecxPITUBZ91S0L9JRlmWdeeqLxC0",
  authDomain: "ionic2-firebase-chat-c13b0.firebaseapp.com",
  databaseURL: "https://ionic2-firebase-chat-c13b0.firebaseio.com",
  storageBucket: "ionic2-firebase-chat-c13b0.appspot.com",
  messagingSenderId: "160084383993"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Custom,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    CapitalizePipe,
    ChatPage,
    CustomLoggedHeaderComponent,
    HomePage,
    MyApp,
    SigninPage,
    SignupPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig, firebaseAuthConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChatPage,
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    AuthProvider,
    ChatProvider
  ]
})
export class AppModule {
}
