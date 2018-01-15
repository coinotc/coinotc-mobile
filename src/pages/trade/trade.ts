import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AddadvertisementPage } from '../addadvertisement/addadvertisement'

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
  buynsell: string = "buy";
  buycryptos: Object[] = [{
    root: 'TradeBuyEthereumPage',
    title: 'ETH',
    icon: 'eth'
  }, {
    root: 'TradeBuyRipplePage',
    title: 'Ripple',
    icon: 'ripple'
  }, {
    root: 'TradeBuyMoneroPage',
    title: 'Monero',
    icon: 'monero'
  }, {
    root: 'TradeBuyStellarPage',
    title: 'Stellar',
    icon: 'stellar'
  },{
    root: 'TradeBuyCardanoPage',
    title: 'Cardano',
    icon: 'cardano'
  }]
  sellcryptos: Object[] = [{
    root: 'TradeSellEthereumPage',
    title: 'Ethereum',
    icon: 'eth'
  }, {
    root: 'TradeSellRipplePage',
    title: 'Ripple',
    icon: 'ripple'
  }, {
    root: 'TradeSellMoneroPage',
    title: 'Monero',
    icon: 'monero'
  }, {
    root: 'TradeSellStellarPage',
    title: 'Stellar',
    icon: 'stellar'
  },{
    root: 'TradeSellCardanoPage',
    title: 'Cardano',
    icon: 'cardano'
  }]
  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TradePage');
  }
  addbuyad() {
    this.appCtrl.getRootNav().push(AddadvertisementPage, { type: 'Buy', title: 'publishBuy' })
  }
  addsellad() {
    this.appCtrl.getRootNav().push(AddadvertisementPage, { type: 'Sell', title: 'publishSell' })
  }
}
