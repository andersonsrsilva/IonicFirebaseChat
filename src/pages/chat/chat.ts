import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from '../../providers/auth/auth.provider';
import {User} from '../../models/user.model';
import {UserProvider} from '../../providers/user/user.provider';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  messages: string[] = [];
  pageTitle: string;
  sender: User;
  recipient: User;

  constructor(public authProvider: AuthProvider,
              public navCtrl: NavController,
              public navParams: NavParams,
              public userProvider: UserProvider) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authProvider.authenticated;
  }

  ionViewDidLoad() {
    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle = this.recipient.name;
    this.userProvider.currentUser
      .first()
      .subscribe((currentUser: User) => {
        this.sender = currentUser;
      });
  }

  sendMessage(newMessage: string): void {
    this.messages.push(newMessage);
  }

}
