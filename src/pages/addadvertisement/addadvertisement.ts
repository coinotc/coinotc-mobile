import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { adinformation } from '../../models/adinformation';
import { AdvertisementServiceProvider } from '../../providers/advertisement-service/advertisement-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the AddadvertisementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addadvertisement',
  templateUrl: 'addadvertisement.html',
})
export class AddadvertisementPage {
  rangepercent = 0; type: String; title: String; information = new adinformation('', true, 'ETHEREUM', 'singapore', 'SGD', null, null, null, '', null, '');
  cryptoprice: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private adservice: AdvertisementServiceProvider, private userservice: UserServiceProvider) {
    this.type = navParams.data.type;
    this.title = navParams.data.title;
    this.changerange();
    this.adservice.getprice('Ethereum', 'SGD').subscribe(result => {
      this.cryptoprice = Number(result[0].price_sgd);
      this.information.price = this.cryptoprice;
    });
  }
  getcryptoprice() {
    switch (this.information.crypto) {
      case 'ETH':
        this.getfiatprice('Ethereum');
        break;
      case 'MONERO':
        this.getfiatprice('MONERO');
        break;
      case 'RIPPLE':
        this.getfiatprice('RIPPLE');
        break;
      case 'STELLAR':
        this.getfiatprice('STELLAR');
        break;
      case 'CARDANO':
        this.getfiatprice('CARDANO');
        break;
    }
  }
  getfiatprice(crypto) {
    switch (this.information.fiat) {
      case 'SGD':
        this.adservice.getprice(crypto, 'SGD').subscribe(result => {
          this.cryptoprice = Number(result[0].price_sgd);
          this.changerange()
        })
        break;
      case 'CNY':
        this.adservice.getprice(crypto, 'CNY').subscribe(result => {
          this.cryptoprice = Number(result[0].price_cny);
          this.changerange()
        })
        break;
      case 'USD':
        this.adservice.getprice(crypto, 'USD').subscribe(result => {
          this.cryptoprice = Number(result[0].price_usd);
          this.changerange()
        })
        break;
      case 'KRW':
        this.adservice.getprice(crypto, 'KRW').subscribe(result => {
          this.cryptoprice = Number(result[0].price_krw);
          this.changerange()
        })
        break;
    }
  }
  changerange() {
    this.information.price = Number((this.cryptoprice * (100 + this.rangepercent) / 100).toFixed(4));
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddadvertisementPage');
  }
  addbuyad() {
    this.information.owner = this.userservice.getCurrentUser().username;
    this.adservice.addadbuy(this.information).subscribe(result => {
      console.log(result);
      this.navCtrl.pop();
    });
  }
  addsellad() {
    this.information.owner = this.userservice.getCurrentUser().username;
    this.adservice.addadsell(this.information).subscribe(result => {
      console.log(result);
      this.navCtrl.pop();
    });
  }
}
