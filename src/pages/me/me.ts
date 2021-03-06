import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  App,
  Events
} from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Errors } from '../../models/errors.model';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { ComplainPage } from '../complain/complain';
import { AdvertisementsPage } from '../advertisements/advertisements';
import { TrustedPage } from '../trusted/trusted';
import { TradePage } from '../trade/trade';
import { GoogleAuthPage } from '../google-auth/google-auth';
import { ProfileServiceProvider } from '../../providers/profile-service/profile-service';
import { Profile } from '../../models/profile.model';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { UnbindGoogleAuthPage } from '../unbind-google-auth/unbind-google-auth';
import { Storage } from '@ionic/storage';
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
  enableNotifications = true;
  model = new Profile(null, null, null, null, null);
  followingCount;
  followerCount;
  rating = 0;
  user = {
    name: 'Default user',
    email: '',
    imageUrl: 'assets/img/avatar/marty-avatar.png'
  };
  profileBadge: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserServiceProvider,
    public toastCtrl: ToastController,
    public appCtrl: App,
    public profileService: ProfileServiceProvider,
    public orderService: OrderServiceProvider,
    public events: Events,
    public storage: Storage
  ) {
    this.currentuser = this.userService.getCurrentUser();
    this.user.name = this.currentuser.username;
    this.doRefresh();
    this.user.email = this.currentuser.email;
    this.storage
      .ready()
      .then(() => this.storage.get(`${this.user.name}NewFollowers`))
      .then(value => {
        if (value != null) {
          this.profileBadge = value;
        } else {
          this.profileBadge = 0;
        }
      });
    events.subscribe('profileBadge:updated', _badgeValue => {
      this.profileBadge = _badgeValue;
      console.log('followBadge:' + this.profileBadge);
    });
  }
  ionViewWillEnter() {
    this.doRefresh();
  }
  doRefresh() {
    this.profileService.getProfile(this.user.name).subscribe(result => {
      //console.log(result[0].ratings+"111111111111111111111");
      if (!(result[0].ratings.length == 0)) {
        this.rating = 0;
        for (let _i: number = 0; _i < result[0].ratings.length; _i++) {
          console.log(result[0]);
          let num = result[0].ratings[_i];
          console.log(num);
          this.rating = this.rating + num;
        }
        this.rating = this.rating / result[0].ratings.length;
      }
      //this.model = result[0];
      this.followerCount = result[0].followers.length;
      this.followingCount = result[0].following.length;
    });
    this.orderService.getMyTrade(this.user.name).subscribe(result => {
      this.model.orderCount = result;
    });
  }
  advertisementsTapped() {
    this.appCtrl.getRootNav().push(AdvertisementsPage);
  }
  trustedTapped() {
    this.appCtrl.getRootNav().push(TrustedPage);
    this.storage
      .ready()
      .then(() =>
        this.storage
          .set(`${this.user.name}NewFollowers`, 0)
          .then(() => this.events.publish('profileBadge:updated', 0))
      );
  }
  settingsTapped() {
    this.appCtrl.getRootNav().push(SettingsPage);
  }
  googleAuth() {
    this.profileService.getProfile(this.user.name).subscribe(result => {
      //console.log(result[0].tfa.effective)
      if (result[0].tfa.effective)
        this.appCtrl.getRootNav().push(UnbindGoogleAuthPage);
      else this.appCtrl.getRootNav().push(GoogleAuthPage);
    });
    //this.appCtrl.getRootNav().push(GoogleAuthPage);
  }
  complain() {
    this.appCtrl.getRootNav().push(ComplainPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MePage');
  }
}
