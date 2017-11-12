import {Component} from '@angular/core';
import {AlertController, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseProvider} from '../../providers/base/base';
import {SignupPage} from '../signup/signup';
import {AuthProvider} from '../../providers/auth/auth';
import {HomePage} from '../home/home';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage extends BaseProvider {

  signinForm: FormGroup;

  constructor(public navCtrl: NavController,
              public authProvider: AuthProvider,
              public alertCrtl: AlertController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams,
              public formBuild: FormBuilder) {
    super();

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signinForm = this.formBuild.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {

    let loading: Loading = this.showLoading();

    this.authProvider.signinWithEmail(this.signinForm.value)
      .then((isLogged: boolean) => {
        if (isLogged) {
          this.navCtrl.setRoot(HomePage);
          loading.dismiss();
        }
      }).catch((error: any) => {
      console.log(error);
      loading.dismiss();
      this.showAlert(error);
    });
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage)
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

  onHomePage(): void {
    this.navCtrl.push(HomePage)
      .then((hasAccess: boolean) => {
        console.log('Autorizado? ', hasAccess);
      }).catch(err => {
      console.log( err);
      //mensagem de erro ao consultar
    });
  }

}
