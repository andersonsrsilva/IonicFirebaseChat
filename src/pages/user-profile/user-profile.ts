import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {User} from "../../models/user.model";
import {UserProvider} from "../../providers/user/user";

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  currentUser: User;
  canEdit: boolean = false;

  constructor(public authProvider: AuthProvider,
              public navCtrl: NavController,
              public navParams: NavParams,
              public userProvider: UserProvider) {
  }

  ionViewCanEnter() {
    this.authProvider.authenticated;
  }

  ionViewDidLoad() {
    this.userProvider.currentUser
      .subscribe((user: User) => {
        this.currentUser = user;
      });
  }

}
