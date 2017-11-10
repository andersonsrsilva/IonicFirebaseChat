import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import {User} from '../../models/user.model';
import {UserProvider} from '../../providers/user/user.provider';
import {FirebaseListObservable} from 'angularfire2';
import {AuthProvider} from '../../providers/auth/auth.provider';
import {ChatPage} from '../chat/chat';
import {ChatProvider} from '../../providers/chat/chat.provider';
import {Chat} from '../../models/chat.model';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: FirebaseListObservable<User[]>;
  view: string = 'chats';

  constructor(public navCtrl: NavController,
              public userProvider: UserProvider,
              public authProvider: AuthProvider,
              public chatProvider: ChatProvider) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authProvider.authenticated;
  }

  ionViewDidLoad() {
    this.users = this.userProvider.users;
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  onChatCreate(recipientUser: User) {

    this.userProvider.currentUser
      .first()
      .subscribe((currentUser: User) => {
        this.chatProvider.getDeepChat(currentUser.$key, recipientUser.$key)
          .first()
          .subscribe((chat: Chat) => {
              if(chat.hasOwnProperty('$value')) {
                let timestamp = firebase.database.ServerValue.TIMESTAMP;

                let chat1 = new Chat('', timestamp, recipientUser.name, '');
                this.chatProvider.create(chat1, currentUser.$key, recipientUser.$key);

                let chat2 = new Chat('', timestamp, recipientUser.name, '');
                this.chatProvider.create(chat2, recipientUser.$key, currentUser.$key);
              }
          })
      });

    console.log("User: ", recipientUser);
    this.navCtrl.push(ChatPage, {
      recipientUser: recipientUser
    });
  }
}
