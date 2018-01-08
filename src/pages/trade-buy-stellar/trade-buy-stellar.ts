import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IonicPage, NavController } from 'ionic-angular';
import { AdvertisementServiceProvider } from '../../providers/advertisement-service/advertisement-service';
import { adinformation } from '../../models/adinformation';

/**
 * Generated class for the TradeBuyStellarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trade-buy-stellar',
  templateUrl: 'trade-buy-stellar.html',
})
export class TradeBuyStellarPage {
  private list: Observable<adinformation[]>;
  constructor(public navCtrl: NavController, public adservice:AdvertisementServiceProvider) {
    this.list = adservice.getadbuy("STELLAR");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TradeBuyStellarPage');
  }

}
