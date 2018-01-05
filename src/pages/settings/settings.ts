import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  language: any;
  languages = ['English', 'Portuguese', 'French'];
  realNameTapped(){
    this.navCtrl.push("AdvertisementsPage");
  }
  paymentPrdTapped(){
    this.navCtrl.push("AdvertisementsPage");
  }
  bindPhoneTapped(){
    this.navCtrl.push("AdvertisementsPage");
  }
  bindEmailTapped(){
    this.navCtrl.push("AdvertisementsPage");
  }
  passwordTapped(){
    this.navCtrl.push("AdvertisementsPage");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
