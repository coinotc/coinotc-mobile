import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AdActivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ad-active',
  templateUrl: 'ad-active.html',
})
export class AdActivePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    console.log('[2] will load fired');
  }

  ionViewDidLoad() {
    console.log('[2] did load fired');
  }

  ionViewWillEnter() {
    console.log('[2] will enter fired');
  }

  ionViewDidEnter() {
    console.log('[2] did enter fired');
  }

}
