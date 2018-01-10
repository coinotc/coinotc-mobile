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

  private buyerActiveOrders: Observable<any>;
  private sellerActiveOrders: Observable<any>;
  private buyerFinishedOrders: Observable<any>;
  private sellerFinishedOrders: Observable<any>;
  private user;
  segments = "ActiveBuy";
  status = "Active";

  constructor(public navCtrl: NavController, public navParams: NavParams, private orderServiceProvider: OrderServiceProvider, private userServiceProvider: UserServiceProvider) {
    this.user = this.userServiceProvider.getCurrentUser();
    this.buyerActiveOrders = this.orderServiceProvider.getBuyerOrders(this.user.username, false);
    this.sellerActiveOrders = this.orderServiceProvider.getSellerOrders(this.user.username, false);
    this.buyerFinishedOrders = this.orderServiceProvider.getBuyerOrders(this.user.username, true);
    this.sellerFinishedOrders = this.orderServiceProvider.getSellerOrders(this.user.username, true);
  }

  onDetail(order) {
    this.navCtrl.push(OrderWindowPage, order)
  }

  ionViewDidLoad() {
    console.log();
  }

}
