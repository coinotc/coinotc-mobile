import { Component } from '@angular/core';
import { Alert } from '../../models/alert';
import { Observable } from 'rxjs/Observable';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
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
  public averagePrice;
  private alerts: Observable<any>;
  private user;
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
    public modalCtrl: ModalController,
    private alertServiceProvider: AlertServiceProvider,
    private userServiceProvider: UserServiceProvider,
    private orderServiceProvider: OrderServiceProvider
  ) {
    this.user = this.userServiceProvider.getCurrentUser().username;
    this.alerts = this.alertServiceProvider.getAlerts(this.user, this.crypto);
    this.orderServiceProvider
      .getAlertInformation('USD', this.crypto)
      .subscribe(result => {
        this.averagePrice = result;
      });
  }

  changeCrypto(cryptoValue) {
    this.crypto = cryptoValue;
    this.alerts = this.alertServiceProvider.getAlerts(this.user, this.crypto);
    this.orderServiceProvider
      .getAlertInformation('USD', this.crypto)
      .subscribe(result => {
        if (!result) {
          this.averagePrice = 0;
        } else {
          this.averagePrice = result;
        }
      });
  }

  addNewAlert() {
    let modal = this.modalCtrl.create(AddAlertPage, {
      crypto: this.crypto,
      user: this.user
    });
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
  public user: string;
  public fiat: string = 'USD';
  model = new Alert('', null, '', '', null);

  constructor(
    public platform: Platform,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private orderServiceProvider: OrderServiceProvider,
    private alertServiceProvider: AlertServiceProvider
  ) {
    this.user = this.navParams.get('user');
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

  onCreate() {
    this.model.username = this.user;
    this.model.price = this.price;
    this.model.fiat = this.fiat;
    this.model.crypto = this.crypto;
    console.log(this.user);
    console.log(this.price);
    console.log(this.fiat);
    console.log(this.crypto);
    console.log(this.model);
    this.alertServiceProvider.postAlert(this.model).subscribe(result => {
      console.log(result);
      this.viewCtrl.dismiss();
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
