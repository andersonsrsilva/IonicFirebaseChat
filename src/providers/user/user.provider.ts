import {Injectable} from '@angular/core';
import {AngularFire, FirebaseAuthState, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {User} from '../../models/user.model';
import {BaseProvider} from '../base/base.provider';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserProvider extends BaseProvider {

  users: FirebaseListObservable<User[]>;
  currentUser: FirebaseObjectObservable<User>;

  constructor(private af: AngularFire) {
    super();
    this.users = this.af.database.list('/users');
    this.listenAuthState();
  }

  private listenAuthState(): void {
    this.af.auth.subscribe((authState: FirebaseAuthState) => {
      if (authState) {
        this.currentUser = this.af.database.object(`/users/${authState.auth.uid}`);
      }
    });
  }

  create(user: User, uuid: string): firebase.Promise<void> {
    return this.af.database.object(`/users/${uuid}`)
      .set(user)
      .catch(this.handlePromiseError);
  }

  userExists(username: string): Observable<boolean> {
    return this.af.database.list('/users', {
      query: {
        orderByChild: 'username',
        equalTo: username
      }
    }).map((users: User[]) => {
      return users.length > 0;
    }).catch(this.handleObservableError);
  }

}
