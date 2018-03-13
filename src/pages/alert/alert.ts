import { Component } from '@angular/core';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  ModalController,
  ViewController
} from 'ionic-angular';

/**
 * Generated class for the AlertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html'
})
export class AlertPage {
  public crypto: string = 'ETHEREUM';
  cryptosFAB: Object[] = [
    {
      value: 'ETHEREUM',
      icon: 'eth'
    },
    {
      value: 'RIPPLE',
      icon: 'ripple'
    },
    {
      value: 'MONERO',
      icon: 'monero'
    },
    {
      value: 'STELLAR',
      icon: 'stellar'
    },
    {
      value: 'CARDANO',
      icon: 'cardano'
    }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {}

  changeCrypto(cryptoValue) {}

  addNewAlert() {
    let modal = this.modalCtrl.create(AddAlertPage, { crypto: this.crypto });
    modal.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AlertPage');
  }
}

@Component({
  selector: 'page-addalert',
  templateUrl: 'add-alert.html'
})
export class AddAlertPage {
  public price: any;
  public crypto: string;
  public fiat: string = 'USD';

  constructor(
    public platform: Platform,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private orderServiceProvider: OrderServiceProvider
  ) {
    this.crypto = this.navParams.get('crypto');
    this.orderServiceProvider
      .getAlertInformation(this.fiat, this.crypto)
      .subscribe(result => {
        this.price = result;
        console.log(typeof result);
      });
  }

  onFiat(fiat) {
    this.orderServiceProvider
      .getAlertInformation(fiat, this.crypto)
      .subscribe(result => {
        this.price = result;
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
