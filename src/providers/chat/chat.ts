import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {BaseProvider} from '../base/base';
import {Chat} from '../../models/chat.model';
import {AngularFire, FirebaseAuthState, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class ChatProvider extends BaseProvider {

  chats: FirebaseListObservable <Chat[]>;

  constructor(public http: Http,
              public af: AngularFire) {
    super();
    this.setChats();
  }

  private setChats(): void {
    this.af.auth
      .subscribe((authState: FirebaseAuthState) => {
        if (authState) {
          this.chats = <FirebaseListObservable<Chat[]>>this.af.database.list(`/chats/${authState.auth.uid}`, {
            query: {
              orderByChild: 'timestamp'
            }
          }).map((chats: Chat[]) => {
            return chats.reverse();
          }).catch(this.handleObservableError);
        }
      });
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
