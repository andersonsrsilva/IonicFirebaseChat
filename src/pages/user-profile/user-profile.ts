import {ChangeDetectorRef, Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {User} from "../../models/user.model";
import {UserProvider} from "../../providers/user/user";

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  currentUser: User;
  canEdit: boolean = false;
  private filePhoto: File;
  uploadProgress: number;

  constructor(public authProvider: AuthProvider,
              public cd: ChangeDetectorRef,
              public navCtrl: NavController,
              public navParams: NavParams,
              public userProvider: UserProvider) {
  }

  ionViewCanEnter() {
    this.authProvider.authenticated;
  }

  ionViewDidLoad() {
    this.userProvider.currentUser
      .subscribe((user: User) => {
        this.currentUser = user;
      });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.filePhoto) {
      let uploadTask = this.userProvider.uploadPhoto(this.filePhoto, this.currentUser.$key);

      uploadTask.on('state_changed', (snapshot) => {
        this.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.cd.detectChanges();
      }, (error: Error) => {
        // catch error
      }, () => {
        this.editUser(uploadTask.snapshot.downloadURL);
      });
    } else {
      this.editUser();
    }
  }

  onPhoto(event): void {
    this.filePhoto = event.target.files[0];
  }

  private editUser(photoUrl?: string): void {
    this.userProvider.edit({
      name: this.currentUser.name,
      username: this.currentUser.username,
      photo: photoUrl || this.currentUser.photo || ''
    }).then(() => {
      this.canEdit = false;
      this.filePhoto = undefined;
      this.uploadProgress = 0;
    });
  }


}
