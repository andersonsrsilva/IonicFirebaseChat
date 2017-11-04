import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from '../../providers/auth/auth.provider';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  messages: string[] = [];

  constructor(public a: AuthProvider,
              public navCtrl: NavController,
              public navParams: NavParams) {
  }

  sendMessage(newMessage: string): void {
    this.messages.push(newMessage);
  }

}
