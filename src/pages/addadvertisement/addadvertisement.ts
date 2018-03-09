import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdvertisementServiceProvider } from '../../providers/advertisement-service/advertisement-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { advertisement } from '../../models/advertisement';
import { FormGroup } from '@angular/forms';
/**
 * Generated class for the AddadvertisementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addadvertisement',
  templateUrl: 'addadvertisement.html'
})
export class AddadvertisementPage {
  adform: FormGroup;
  rangepercent = 0;
  type: String;
  title: String;
  model = new advertisement(
    '',
    true,
    'ETHEREUM',
    'singapore',
    'SGD',
    null,
    null,
    null,
    '',
    null,
    '',
    null
  );
  //information = new adinformation('', true, 'ETHEREUM', 'singapore', 'SGD', null, null, null, '', null, '');
  cryptoprice: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private adservice: AdvertisementServiceProvider,
    private userservice: UserServiceProvider
  ) {
    this.type = navParams.data.type;
    this.title = navParams.data.title;
    this.changerange();
    this.adservice.getprice('Ethereum', 'SGD').subscribe(result => {
      this.cryptoprice = Number(result[0].price_sgd);
      this.model.price = this.cryptoprice;
    });
  }
  getcryptoprice() {
    switch (this.model.fiat) {
      case 'SGD':
        this.adservice.getprice(this.model.crypto, 'SGD').subscribe(result => {
          this.cryptoprice = Number(result[0].price_sgd);
          this.changerange();
        });
        break;
      case 'CNY':
        this.adservice.getprice(this.model.crypto, 'CNY').subscribe(result => {
          this.cryptoprice = Number(result[0].price_cny);
          this.changerange();
        });
        break;
      case 'USD':
        this.adservice.getprice(this.model.crypto, 'USD').subscribe(result => {
          this.cryptoprice = Number(result[0].price_usd);
          this.changerange();
        });
        break;
      case 'KRW':
        this.adservice.getprice(this.model.crypto, 'KRW').subscribe(result => {
          this.cryptoprice = Number(result[0].price_krw);
          this.changerange();
        });
        break;
    }
  }
  changerange() {
    this.model.price = Number(
      (this.cryptoprice * (100 + this.rangepercent) / 100).toFixed(4)
    );
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddadvertisementPage');
  }
  addbuyad() {
    this.model.type = 1;
    this.model.owner = this.userservice.getCurrentUser().username;
    this.adservice.addadvertisement(this.model).subscribe(result => {
      console.log(result);
      this.navCtrl.pop();
    });
  }
  addsellad() {
    this.model.type = 0;
    this.model.owner = this.userservice.getCurrentUser().username;
    this.adservice.addadvertisement(this.model).subscribe(result => {
      console.log(result);
      this.navCtrl.pop();
    });
  }
}
