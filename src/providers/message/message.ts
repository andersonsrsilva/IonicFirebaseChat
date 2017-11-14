import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {BaseProvider} from "../base/base";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {Message} from "../../models/message.model";

@Injectable()
export class MessageProvider extends BaseProvider {

  constructor(public http: Http,
              public af: AngularFire) {
    super();
  }

  create(message: Message, listMessages: FirebaseListObservable<Message[]>): firebase.Promise<void> {
    return listMessages.push(message)
      .catch(this.handlePromiseError);
  }

  getMessages(userId1: string, userId2: string): FirebaseListObservable<Message[]> {
    return <FirebaseListObservable<Message[]>>this.af.database.list(`/messages/${userId1}-${userId2}`, {
      query: {
        orderByChild: 'timestamp'
      }
    }).catch(this.handleObservableError);
  }

}
