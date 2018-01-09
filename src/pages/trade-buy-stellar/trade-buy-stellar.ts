import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AdvertisementServiceProvider } from '../../providers/advertisement-service/advertisement-service';
import { adinformation } from '../../models/adinformation';

/**
 * Generated class for the TradeBuyStellarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trade-buy-stellar',
  templateUrl: 'trade-buy-stellar.html',
})
export class TradeBuyStellarPage {
  private list: adinformation[];
  constructor(public navCtrl: NavController, public adservice: AdvertisementServiceProvider) {
    this.doRefresh();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TradeBuyStellarPage');
  }
  doRefresh(refresher?) {
    // this.list = this.adservice.getadbuy("ETH");
    this.adservice.getadbuy("STELLAR").subscribe(result => {
      this.list = result;
      if (refresher) {
        refresher.complete();
      }
    })
  }

}
