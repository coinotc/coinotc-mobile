import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TradeSellEthereumPage } from '../trade-sell-ethereum/trade-sell-ethereum';
import { TradeSellMoneroPage } from '../trade-sell-monero/trade-sell-monero';
import { TradeSellRipplePage } from '../trade-sell-ripple/trade-sell-ripple';
import { TradeSellStellarPage } from '../trade-sell-stellar/trade-sell-stellar';
import { TradeBuyEthereumPage } from '../trade-buy-ethereum/trade-buy-ethereum';
import { TradeBuyMoneroPage } from '../trade-buy-monero/trade-buy-monero';
import { TradeBuyRipplePage } from '../trade-buy-ripple/trade-buy-ripple';
import { TradeBuyStellarPage } from '../trade-buy-stellar/trade-buy-stellar';

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
    root: TradeBuyEthereumPage,
    title: 'Ethereum',
    icon: 'eth'
  },{
    root: TradeBuyMoneroPage,
    title: 'Monero',
    icon: 'monero'
  },{
    root: TradeBuyRipplePage,
    title: 'Ripple',
    icon: 'ripple'
  },{
    root: TradeBuyStellarPage,
    title: 'Stellar',
    icon: 'stellar'
  }]
  sellcryptos: Object[] = [{
    root: TradeSellEthereumPage,
    title: 'Ethereum',
    icon: 'eth'
  },{
    root: TradeSellMoneroPage,
    title: 'Monero',
    icon: 'monero'
  },{
    root: TradeSellRipplePage,
    title: 'Ripple',
    icon: 'ripple'
  },{
    root: TradeSellStellarPage,
    title: 'Stellar',
    icon: 'stellar'
  }]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TradePage');
  }

}
