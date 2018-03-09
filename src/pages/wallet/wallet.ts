import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html'
})
export class WalletPage {
  segments = 'Ethereum';
  tradeSegments = 'Receive';

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  onSegment() {
    //To be done...
  }

  onCopy() {
    //To be done...
  }

  onAllAddress() {
    //To be done...
  }

  onComfirm() {
    //To be done...
  }

  // cryptoWalletSelected(wallet) {
  //   this.navCtrl.push('WalletDetailsPage');
  // }

  // addNewWallet() {
  //   this.navCtrl.push('AddnewwalletPage');
  // }
}
