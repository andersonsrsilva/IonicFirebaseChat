import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import {User} from '../../models/user.model';
import {UserProvider} from '../../providers/user/user.provider';
import {FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: FirebaseListObservable<User[]>;

  constructor(public navCtrl: NavController,
              public userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    this.users = this.userProvider.users;
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  onChatCreate(user: User) {
    console.log(user);
  }
}
