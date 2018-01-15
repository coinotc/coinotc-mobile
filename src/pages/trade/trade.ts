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
    title: 'Ethereum',
    icon: 'eth'
  },{
    root: 'TradeBuyMoneroPage',
    title: 'Monero',
    icon: 'monero'
  },{
    root: 'TradeBuyRipplePage',
    title: 'Ripple',
    icon: 'ripple'
  },{
    root: 'TradeBuyStellarPage',
    title: 'Stellar',
    icon: 'stellar'
  }]
  sellcryptos: Object[] = [{
    root: 'TradeSellEthereumPage',
    title: 'Ethereum',
    icon: 'eth'
  },{
    root: 'TradeSellMoneroPage',
    title: 'Monero',
    icon: 'monero'
  },{
    root: 'TradeSellRipplePage',
    title: 'Ripple',
    icon: 'ripple'
  },{
    root: 'TradeSellStellarPage',
    title: 'Stellar',
    icon: 'stellar'
  }]
  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl:App ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TradePage');
  }
  addbuyad() {
    this.appCtrl.getRootNav().push(AddadvertisementPage, {type:'buy',title:'publishBuy'})
  }
  addsellad() {
    this.appCtrl.getRootNav().push(AddadvertisementPage, {type:'sell',title:'publishSell'})
  }
}
