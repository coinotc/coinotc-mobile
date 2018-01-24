import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {
  
  wallets: any[];
  // eth, monero, ripple, stellar, cardano 
  walletLogo: string[] = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/471px-Ethereum_logo_2014.svg.png',
    'https://cdn.worldvectorlogo.com/logos/monero.svg',
    'https://cdn.worldvectorlogo.com/logos/ripple-2.svg',
    'https://cgi.cryptoreport.com/images/coins/xlm.svg',
    'http://files.coinmarketcap.com.s3-website-us-east-1.amazonaws.com/static/img/coins/200x200/cardano.png',
  ]

  supportedCryptoCurry = ['ETH', 'ADA', 'XLM', 'XMR', 'XRP'];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _http: HttpClient) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPage');
    this.getWallets();
  }

  getWallets() {
    return this._http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,ADA,XLM,XMR,XRP,&tsyms=USD')
    .subscribe(result => {
      console.log(result);
      var transformWallet = [];
      for (let cryptoIndex in this.supportedCryptoCurry) {
        console.log(">>> " + this.supportedCryptoCurry[cryptoIndex]);
        console.log(JSON.stringify(this.supportedCryptoCurry[cryptoIndex]));
        let cryptoNight = {
          currency: null,
          fiatCurryEquiv: 0,
          logo: null,
          desc: 'Default Wallet'
        }
        
        cryptoNight.currency = this.supportedCryptoCurry[cryptoIndex];
        console.log(result[this.supportedCryptoCurry[cryptoIndex]]);
        let value = result[this.supportedCryptoCurry[cryptoIndex]];
        console.log(+value['USD']);
        cryptoNight.fiatCurryEquiv = +value['USD'];
        cryptoNight.logo = this.walletLogo[cryptoIndex];
        transformWallet.push(cryptoNight);
      }
      this.wallets = transformWallet;
    });
  }

  itemSelected(wallet){
  
  }

  addNewWallet(){
    
  }
}