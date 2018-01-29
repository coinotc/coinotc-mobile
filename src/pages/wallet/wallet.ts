import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';
import { Storage } from '@ionic/storage';

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
  baseCurrency: any;

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
    private _http: HttpClient, private storage: Storage) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPage');
  }

  ionViewDidEnter(){
    this.storage.ready().then(() => this.storage.get('nativeCurrency') as Promise<string>).then(currency => {
      console.log("native currency: " + currency['currency']);
      this.baseCurrency = currency['currency'];
      this.getWallets();
    });
  }

  getWallets() {
    return this._http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,ADA,XLM,XMR,XRP,&tsyms=' + this.baseCurrency)
    .subscribe(result => {
      console.log(result);
      var transformWallet = [];
      for (let cryptoIndex in this.supportedCryptoCurry) {
        console.log(">>> " + this.supportedCryptoCurry[cryptoIndex]);
        console.log(JSON.stringify(this.supportedCryptoCurry[cryptoIndex]));
        let cryptoNight = {
          currency: null,
          fiatCurryEquiv: 0,
          fiatCurry: this.baseCurrency,
          logo: null,
          desc: 'Default Wallet'
        }
        
        cryptoNight.currency = this.supportedCryptoCurry[cryptoIndex];
        console.log(result[this.supportedCryptoCurry[cryptoIndex]]);
        let value = result[this.supportedCryptoCurry[cryptoIndex]];
        console.log(+value[this.baseCurrency]);
        cryptoNight.fiatCurryEquiv = +value[this.baseCurrency];
        cryptoNight.logo = this.walletLogo[cryptoIndex];
        transformWallet.push(cryptoNight);
      }
      this.wallets = transformWallet;
    });
  }

  cryptoWalletSelected(wallet){
    this.navCtrl.push("WalletDetailsPage");
  }

  addNewWallet(){
    this.navCtrl.push("AddnewwalletPage");
  }
}