import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { Observable } from 'rxjs/Observable';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { OrderWindowPage } from '../order-window/order-window';
import { ChatPage } from '../chat/chat';

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

  private orders: Observable<any>;
  segments = "Active";

  constructor(public navCtrl: NavController, public navParams: NavParams, private orderServiceProvider:OrderServiceProvider) {
    this.orders = this.orderServiceProvider.getOrders(null);
  }

  onDetail(order){
    this.navCtrl.push(OrderWindowPage,order)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderListPage');
  }

}
