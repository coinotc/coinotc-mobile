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
    title: 'XRP',
    icon: 'ripple'
  }, {
    root: 'TradeBuyMoneroPage',
    title: 'XMR',
    icon: 'monero'
  }, {
    root: 'TradeBuyStellarPage',
    title: 'XLM',
    icon: 'stellar'
  },{
    root: 'TradeBuyCardanoPage',
    title: 'ADA',
    icon: 'cardano'
  }]
  sellcryptos: Object[] = [{
    root: 'TradeSellEthereumPage',
    title: 'ETH',
    icon: 'eth'
  }, {
    root: 'TradeSellRipplePage',
    title: 'XRP',
    icon: 'ripple'
  }, {
    root: 'TradeSellMoneroPage',
    title: 'XMR',
    icon: 'monero'
  }, {
    root: 'TradeSellStellarPage',
    title: 'XLM',
    icon: 'stellar'
  },{
    root: 'TradeSellCardanoPage',
    title: 'ADA',
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
