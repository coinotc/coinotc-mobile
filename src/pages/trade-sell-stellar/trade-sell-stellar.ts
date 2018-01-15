import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { AdvertisementServiceProvider } from '../../providers/advertisement-service/advertisement-service';
import { adinformation } from '../../models/adinformation';
import { AdinformationPage } from '../adinformation/adinformation';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the TradeSellStellarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trade-sell-stellar',
  templateUrl: 'trade-sell-stellar.html',
})
export class TradeSellStellarPage {
  private list: adinformation[];
  constructor(public navCtrl: NavController, public adservice: AdvertisementServiceProvider, public appCtrl: App, private translate: TranslateService) {
    translate.setDefaultLang('cn');
    this.doRefresh();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TradeSellStellarPage');
  }
  doRefresh(refresher?) {
    // this.list = this.adservice.getadbuy("ETH");
    this.adservice.getadsell("STELLAR").subscribe(result => {
      this.list = result;
      if (refresher) {
        refresher.complete();
      }
    })
  }
  adinformation(information) {
    this.appCtrl.getRootNav().push(AdinformationPage, { information: information, tradetype: { type: 'Sell', crypto: 'STELLAR' } })
  }

}
