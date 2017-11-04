import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {BaseProvider} from '../base/base.provider';
import {Chat} from '../../models/chat.model';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class ChatProvider extends BaseProvider {

  constructor(public http: Http,
              public af: AngularFire) {
    super();
  }

  create(chat: Chat, userId1: string, userId2: string): firebase.Promise<void> {
    return this.af.database.object(`/chats/${userId1}/${userId2}`)
      .set(chat)
      .catch(this.handlePromiseError);
  }

  getDeepChat(userId1: string, userId2: string): FirebaseObjectObservable<Chat> {
    return <FirebaseObjectObservable<Chat>>this.af.database.object(`/chats/${userId1}/${userId2}`)
      .catch(this.handleObservableError);
  }

}
