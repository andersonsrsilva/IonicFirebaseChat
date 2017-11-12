import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from '../../providers/auth/auth';
import {User} from '../../models/user.model';
import {UserProvider} from '../../providers/user/user';
import {FirebaseListObservable} from "angularfire2";
import {Message} from "../../models/message.model";
import {MessageProvider} from "../../providers/message/message";

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  messages: FirebaseListObservable<Message[]>;
  pageTitle: string;
  sender: User;
  recipient: User;

  constructor(public authProvider: AuthProvider,
              public navCtrl: NavController,
              public messageProvider: MessageProvider,
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

        this.messages = this.messageProvider.getMessages(this.sender.$key, this.recipient.$key);

        this.messages
          .first()
          .subscribe((messages: Message[]) => {
            if (messages.length === 0) {
              this.messages = this.messageProvider.getMessages(this.recipient.$key, this.sender.$key);
            }
          });
      });
  }

  sendMessage(newMessage: string): void {
    this.messages.push(newMessage);
  }

}
