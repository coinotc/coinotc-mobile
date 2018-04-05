import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  App
} from 'ionic-angular';
import { AuthPage } from '../auth/auth';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { JwtServiceProvider } from '../../providers/jwt-service/jwt-service';
import { Errors } from '../../models/errors.model';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { ComplainPage } from '../complain/complain';
import { AdvertisementsPage } from  '../advertisements/advertisements';
import { TrustedPage } from '../trusted/trusted';
import { TradePage } from '../trade/trade';
/**
 * Generated class for the MePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {
  private currentuser;
  isSubmitting = false;
  enableNotifications = true;

  user = {
    name: 'Default user',
    email: '',
    imageUrl: 'assets/img/avatar/marty-avatar.png'
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserServiceProvider,
    public jwtService: JwtServiceProvider,
    public toastCtrl: ToastController,
    public appCtrl:App
  ) {
    this.currentuser = this.userService.getCurrentUser();
    this.user.name = this.currentuser.username;
    this.user.email = this.currentuser.email;
  }

  advertisementsTapped() {
    this.navCtrl.push(AdvertisementsPage);
  }
  trustedTapped() {
    this.navCtrl.push(TrustedPage);
  }
  settingsTapped() {
    this.navCtrl.push(SettingsPage);
  }
  updateProfileImage() {
    if (this.userService.getCurrentUser().username == '') {
      this.navCtrl.push(AuthPage);
    } else {
      this.navCtrl.push(
        ProfilePage,
        this.userService.getCurrentUser().username
      );
    }
  }
  complain() {
    this.navCtrl.push(ComplainPage);
  }
  logout() {
    //this.tabRef.select(3);
    this.isSubmitting = true;
    //console.log(this.userService.logout());
    this.userService.logout().subscribe(
      user => {
        console.log('log out !!!!!');
        this.jwtService.destroyToken();
        let tabs = document.querySelectorAll('.tabbar.show-tabbar');
        if (tabs !== null) {
          Object.keys(tabs).map(key => {
            tabs[key].style.display = 'none';
          });
        }
        let nav = this.appCtrl.getRootNav();
        nav.setRoot(AuthPage) // end if
      },
      (errors: Errors) => {
        for (let field in errors.errors) {
          this.toastCtrl
            .create({
              message: `${field} ${errors.errors[field]}`,
              duration: 3000
            })
            .present();
        }
        this.isSubmitting = false;
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MePage');
  }
}
