import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { OrderInformation } from './orderInformation';

/**
 * Generated class for the OrderWindowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-window',
  templateUrl: 'order-window.html',
})
export class OrderWindowPage {

  private orders: Observable<OrderInformation[]>;
  approved = 0;
  switched = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private orderServiceProvider: OrderServiceProvider) {
    this.orders = this.orderServiceProvider.getOrders(null);
  }

  onSwitch() {
    this.switched = !this.switched;
  }

  onApprove() {
    this.approved = 1;
  }

  onRating() {
    this.approved = 2;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderWindowPage');
  }

}
