import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AdDisabledPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ad-disabled',
  templateUrl: 'ad-disabled.html',
})
export class AdDisabledPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    console.log('[3] will load fired');
  }

  ionViewDidLoad() {
    console.log('[3] did load fired');
  }

  ionViewWillEnter() {
    console.log('[3] will enter fired');
  }

  ionViewDidEnter() {
    console.log('[3] did enter fired');
  }


}
