import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { last } from '@angular/router/src/utils/collection';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService) {
  }
  language: any;
  languages = [{ label: 'English', value: 'en' }, { label: '中文', value: 'cn' }];
  switchLanguage() {
    this.translate.use(this.language);
  }
  realNameTapped() {
    this.navCtrl.push("RealNameVerifiedPage");
  }
  paymentPrdTapped() {
    this.navCtrl.push("PaymentPrdPage");
  }
  bindPhoneTapped() {
    this.navCtrl.push("BindPhonePage");
  }
  bindEmailTapped() {
    this.navCtrl.push("BindEmailPage");
  }
  passwordTapped() {
    this.navCtrl.push("ModifyPrdPage");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
