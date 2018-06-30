import { Component } from '@angular/core';
import { Alert } from '../../models/alert';
import { Observable } from 'rxjs/Observable';
import { Notification } from '../../models/notification';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
import { ProfileServiceProvider } from '../../providers/profile-service/profile-service';
import { AdvertisementServiceProvider } from '../../providers/advertisement-service/advertisement-service'
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  ModalController,
  ViewController
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
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
  private deviceToken;
  notification = new Notification('', null, null, 'high');
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
  baseCurrency: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private alertServiceProvider: AlertServiceProvider,
    private userServiceProvider: UserServiceProvider,
    private orderServiceProvider: OrderServiceProvider,
    private profileServiceProvider: ProfileServiceProvider,
    private advertisementServiceProvider: AdvertisementServiceProvider,
    private storage: Storage
  ) {
    this.user = this.userServiceProvider.getCurrentUser().username;
    this.doRefresh();
    this.profileServiceProvider.getProfile(this.user).subscribe(result => {
      this.deviceToken = result[0].deviceToken;
      this.notification.to = this.deviceToken;
      console.log(result[0]);
    });
    this.storage.ready().then(() => this.storage.get('nativeCurrency') as Promise<string>).then(value => {
      if (value != null) {
        console.log(value['currency']);
        this.baseCurrency = value['currency'];
      } else {
        this.baseCurrency = 'USD';
      }
    });
  }

  // onDelete(alert) {
  //   this.alertServiceProvider.deleteAlert(alert).subscribe(result => {
  //     this.doRefresh();
  //   });
  // }

  onStatus(alert) {
    this.alertServiceProvider.updateAlert(alert).subscribe(result => {
      this.doRefresh();
    });
  }

  changeCrypto(cryptoValue) {
    this.crypto = cryptoValue;
    this.doRefresh();
    this.advertisementServiceProvider
      .getprice(this.crypto,'USD')
      .subscribe(result => {
        if (!result) {
          this.averagePrice = 0;
        } else {
          this.averagePrice = result[0].price_usd;
          console.log(">>>>ALERT PRICE" + JSON.stringify(this.averagePrice))
        }
      });
  }

  addNewAlert() {
    let modal = this.modalCtrl.create(AddAlertPage, {
      crypto: this.crypto,
      user: this.user
    });
    modal.onDidDismiss(() => {
      this.doRefresh();
    });
    modal.present();
  }

  doRefresh(refresher?) {
    this.advertisementServiceProvider
      .getprice(this.crypto,'USD')
      .subscribe(result => {
        if (!result) {
          this.averagePrice = 0;
        } else {
          this.averagePrice = result[0].price_usd;
          console.log(">>>>ALERT PRICE" + JSON.stringify(this.averagePrice))
        }
      });
    this.alerts = this.alertServiceProvider.getAlerts(this.user, this.crypto);
    if (refresher) {
      refresher.complete();
    }
  }

  ionViewWillEnter() {
    this.doRefresh();
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
  newAlertForm: FormGroup;
  model = new Alert('', null, '', '', true, false, null);

  constructor(
    public platform: Platform,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private orderServiceProvider: OrderServiceProvider,
    private alertServiceProvider: AlertServiceProvider,
    private advertisementServiceProvider: AdvertisementServiceProvider,
    private fb: FormBuilder
  ) {
    this.user = this.navParams.get('user');
    this.crypto = this.navParams.get('crypto');
    this.advertisementServiceProvider
      .getprice(this.crypto,this.fiat)
      .subscribe(result => {
        console.log("HERE>>>>IS>>>>RESULT" + JSON.stringify(result));
        this.price = result[0].price_usd;        
      });
    this.newAlertForm = this.fb.group({
      newPrice: [null, [this.priceValidator]]
    });
  }

  onFiat(fiat) {
    // this.orderServiceProvider
    //   .getAlertInformation(fiat, this.crypto)
    //   .subscribe(result => {
    //     this.price = result;
    //   });
      this.advertisementServiceProvider
      .getprice(this.crypto,fiat)
      .subscribe(result => {
        console.log("HERE>>>>IS>>>>RESULT" + result)
        this.price = result[0].price_usd;        
      });
    console.log(this.model.above);
  }

  onCreate() {
    this.model.username = this.user;
    this.model.price = this.price;
    this.model.fiat = this.fiat;
    this.model.crypto = this.crypto;
    console.log(this.model.above);
    this.alertServiceProvider.postAlert(this.model).subscribe(result => {
      console.log(result);
      this.viewCtrl.dismiss();
    });
  }

  priceValidator = (control: FormControl): { [s: string]: boolean } => {
    const PRICE_REGEXP = /^([1-9]\d*|0)(\.\d{1,2})?$/;
    if (!control.value) {
      return { required: true };
    } else if (!PRICE_REGEXP.test(control.value)) {
      return { error: true, newPrice: true };
    }
  };

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
