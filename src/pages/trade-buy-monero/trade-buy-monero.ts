import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AdvertisementServiceProvider } from '../../providers/advertisement-service/advertisement-service';
import { adinformation } from '../../models/adinformation';
/**
 * Generated class for the TradeBuyMoneroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trade-buy-monero',
  templateUrl: 'trade-buy-monero.html',
})
export class TradeBuyMoneroPage {
  private list: adinformation[];
  constructor(public navCtrl: NavController, public adservice: AdvertisementServiceProvider) {
    this.doRefresh();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TradeBuyMoneroPage');
  }
  doRefresh(refresher?) {
    // this.list = this.adservice.getadbuy("ETH");
    this.adservice.getadbuy("MONERO").subscribe(result => {
      this.list = result;
      if (refresher) {
        refresher.complete();
      }
    })
  }

}
