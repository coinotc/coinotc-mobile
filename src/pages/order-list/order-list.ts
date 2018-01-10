import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { OrderWindowPage } from '../order-window/order-window';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the OrderListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})
export class OrderListPage {

  private activeOrders: Observable<any>;
  private finishedOrders: Observable<any>;
  private user;
  segments = "Active";

  constructor(public navCtrl: NavController, public navParams: NavParams, private orderServiceProvider: OrderServiceProvider, private userServiceProvider: UserServiceProvider) {
    this.user = this.userServiceProvider.getCurrentUser();
    this.activeOrders = this.orderServiceProvider.getOrders(false);
    this.finishedOrders = this.orderServiceProvider.getOrders(true);
  }

  onDetail(order) {
    this.navCtrl.push(OrderWindowPage, order)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderListPage');
  }

}
