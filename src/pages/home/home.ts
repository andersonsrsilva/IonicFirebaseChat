import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import {User} from '../../models/user.model';
import {UserProvider} from '../../providers/user/user';
import {FirebaseListObservable} from 'angularfire2';
import {AuthProvider} from '../../providers/auth/auth';
import {ChatPage} from '../chat/chat';
import {ChatProvider} from '../../providers/chat/chat';
import {Chat} from '../../models/chat.model';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  chats: FirebaseListObservable<Chat[]>;
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
    this.chats = this.chatProvider.chats;
    this.users = this.userProvider.users;
  }

  filterItems(event: any): void {
    let searchTerm: string = event.target.value;

    this.chats = this.chatProvider.chats;
    this.users = this.userProvider.users;

    if (searchTerm) {
      switch (this.view) {
        case 'chats':
          this.chats = <FirebaseListObservable<Chat[]>>this.chats
            .map((chats: Chat[]) => {
              return chats.filter((chat: Chat) => (chat.title.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1))
            });
          break;
        case 'users':
          this.users = <FirebaseListObservable<User[]>>this.users
            .map((users: User[]) => {
              return users.filter((user: User) => (user.name.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1))
            });
          break;
      }
    }
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
            if (chat.hasOwnProperty('$value')) {
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

  onChatOpen(chat: Chat): void {
    let recipientUserId: string = chat.$key;

    this.userProvider.getUserById(recipientUserId)
      .first()
      .subscribe((user: User) => {
        this.navCtrl.push(ChatPage, {
          recipientUser: user
        });
      });
  }


}
