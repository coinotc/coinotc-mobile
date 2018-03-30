import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the TwoFactorAuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-two-factor-auth',
  templateUrl: 'two-factor-auth.html',
})
export class TwoFactorAuthPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TwoFactorAuthPage');
  }

}
