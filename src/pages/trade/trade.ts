import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AddadvertisementPage } from '../addadvertisement/addadvertisement'
import { Content } from 'ionic-angular';
import { AdvertisementServiceProvider } from '../../providers/advertisement-service/advertisement-service';
import { adinformation } from '../../models/adinformation';
import { AdinformationPage } from '../adinformation/adinformation';
import { ProfilePage } from '../profile/profile'
/**
 * Generated class for the TradePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trade',
  templateUrl: 'trade.html',
})
export class TradePage {
  @ViewChild(Content) content: Content;
  buynsell: string = "Buy"; crypto: string = "ETHEREUM"; country: string = "singapore";
  private list: adinformation[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App, public adservice: AdvertisementServiceProvider) {
    this.doRefresh();
  }
  doRefresh(refresher?) {
    if (this.buynsell === "buy") {
      this.adservice.getadvertisement(this.crypto, this.country, 1).subscribe(result => {
        this.list = result;
        if (refresher) {
          refresher.complete();
        }
      })
    } else {
      this.adservice.getadvertisement(this.crypto, this.country, 0).subscribe(result => {
        this.list = result;
        if (refresher) {
          refresher.complete();
        }
      })
    }
  }
  adinformation(information) {
    if (information.type == 1) {
      this.appCtrl.getRootNav().push(AdinformationPage, { information: information, tradetype: { type: 'Buy', crypto: information.crypto } })
    } else {
      this.appCtrl.getRootNav().push(AdinformationPage, { information: information, tradetype: { type: 'Sell', crypto: information.crypto } })
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TradePage');
    this.content.resize();
  }
  addbuyad() {
    this.appCtrl.getRootNav().push(AddadvertisementPage, { type: 'Buy', title: 'publishBuy' })
  }
  addsellad() {
    this.appCtrl.getRootNav().push(AddadvertisementPage, { type: 'Sell', title: 'publishSell' })
  }


}
