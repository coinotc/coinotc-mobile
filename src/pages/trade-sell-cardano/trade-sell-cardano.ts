import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { AdvertisementServiceProvider } from '../../providers/advertisement-service/advertisement-service';
import { adinformation } from '../../models/adinformation';
import { AdinformationPage } from '../adinformation/adinformation';
/**
 * Generated class for the TradeSellCardanoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trade-sell-cardano',
  templateUrl: 'trade-sell-cardano.html',
})
export class TradeSellCardanoPage {
  private list: adinformation[];
  constructor(public navCtrl: NavController, public adservice: AdvertisementServiceProvider, public appCtrl: App) {
    this.doRefresh();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TradeSellEthereumPage');
  }
  doRefresh(refresher?) {
    // this.list = this.adservice.getadbuy("ETH");
    this.adservice.getadsell("CARDANO").subscribe(result => {
      this.list = result;
      if (refresher) {
        refresher.complete();
      }
    })
  }
  adinformation(information) {
    this.appCtrl.getRootNav().push(AdinformationPage, { information: information, tradetype: { type: 'Sell', crypto: 'Cardano' } })
  }

}
