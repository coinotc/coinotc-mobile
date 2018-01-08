import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IonicPage, NavController } from 'ionic-angular';
import { AdvertisementServiceProvider } from '../../providers/advertisement-service/advertisement-service';
import { adinformation } from '../../models/adinformation';

/**
 * Generated class for the TradeSellEthereumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trade-sell-ethereum',
  templateUrl: 'trade-sell-ethereum.html',
})
export class TradeSellEthereumPage {
  private list: Observable<adinformation[]>;
  constructor(public navCtrl: NavController, public adservice:AdvertisementServiceProvider) {
    this.list = adservice.getadsell("ETH");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TradeSellEthereumPage');
  }

}
