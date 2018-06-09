import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WalletDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet-details',
  templateUrl: 'wallet-details.html',
})
export class WalletDetailsPage {
  segments: any = 'Receive';
  public cryptoType;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cryptoType = navParams.get("cryptoType");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletDetailsPage');
  }

  generateQRcode(){

  }

  sendCrypto(){

  }

}
