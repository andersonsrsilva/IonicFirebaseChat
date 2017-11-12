import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserProvider} from '../../providers/user/user';
import {AuthProvider} from '../../providers/auth/auth';
import {FirebaseAuthState} from 'angularfire2';
import {AlertController, Loading, LoadingController, NavController} from 'ionic-angular';
import {BaseProvider} from '../../providers/base/base';
import {HomePage} from '../home/home';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage extends BaseProvider {

  signupForm: FormGroup;

  constructor(public alertCrtl: AlertController,
              public authProvider: AuthProvider,
              public formBuild: FormBuilder,
              public navCrtl: NavController,
              public userProvider: UserProvider,
              public loadingCtrl: LoadingController) {
    super();

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signupForm = this.formBuild.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    let formUser = this.signupForm.value;
    let loadging: Loading = this.showLoading();
    let username: string = formUser.username;

    this.userProvider.userExists(username)
      .first()
      .subscribe((userExists: boolean) => {
        if (!userExists) {
          this.authProvider.createAuthUser({
            email: formUser.email,
            password: formUser.password
          }).then((authState: FirebaseAuthState) => {
            delete formUser.password;
            let uuid: string = authState.auth.uid;

            this.userProvider.create(formUser, uuid)
              .then(() => {
              console.log('Usuario cadastrado!');
              this.navCrtl.setRoot(HomePage);
              loadging.dismiss();
            }).catch((error: any) => {
              console.log(error);
              loadging.dismiss();
              this.showAlert(error);
            });
          }).catch((error: any) => {
            console.log(error);
            loadging.dismiss();
            this.showAlert(error);
          });
        } else {
          this.showAlert(`O username ${username} já está sendo usado em outra conta!`);
          loadging.dismiss();
        }
      });
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCrtl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}
