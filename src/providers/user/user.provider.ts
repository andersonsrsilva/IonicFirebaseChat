import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {User} from '../../models/user.model';
import {BaseProvider} from '../base/base.provider';

@Injectable()
export class UserProvider extends BaseProvider {

  users: FirebaseListObservable<User[]>;

  constructor(private af: AngularFire) {
    super();
    this.users = this.af.database.list('/users');
  }

  create(user: User): firebase.Promise<void> {
    return this.af.database.object(`/users/${user.uid}`)
      .set(user)
      .catch(this.handlePromiseError);
  }

}
