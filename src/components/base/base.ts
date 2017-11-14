import {Component} from '@angular/core';
import {AlertController, App, MenuController, NavController} from 'ionic-angular';
import {SigninPage} from '../../pages/signin/signin';
import {AuthProvider} from '../../providers/auth/auth';

@Component({
  selector: 'base',
  templateUrl: 'base.html'
})
export abstract class BaseComponent {

  protected navCtrl: NavController;

  constructor(public alertCtrl: AlertController,
              public authProvider: AuthProvider,
              public app: App,
              public menuCtrl: MenuController) {
  }

  ngOnInit(): void {
    this.navCtrl = this.app.getActiveNav();
  }

  onLogout(): void {
    this.alertCtrl.create({
      message: 'Do you want to quiet?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.authProvider.logout()
              .then(() => {
                this.navCtrl.setRoot(SigninPage)
              });
          }
        },
        {
          'text': 'No'
        }
      ]
    }).present();
  }

}
