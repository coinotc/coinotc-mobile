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
  placeholderPicture = 'http://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515005723652&di=a1ebb7c0a1b6bfede1ff5ebc057ed073&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D822b27e7b8fb43160e12723948cd2c56%2F6c224f4a20a44623b6b1e24e9222720e0cf3d7a7.jpg';

  constructor(public navCtrl: NavController, public navParams: NavParams, private orderServiceProvider: OrderServiceProvider, private userServiceProvider: UserServiceProvider) {
    this.user = this.userServiceProvider.getCurrentUser();
    this.buyerActiveOrders = this.orderServiceProvider.getBuyerOrders(this.user.username, false);
    this.sellerActiveOrders = this.orderServiceProvider.getSellerOrders(this.user.username, false);
    this.buyerFinishedOrders = this.orderServiceProvider.getBuyerOrders(this.user.username, true);
    this.sellerFinishedOrders = this.orderServiceProvider.getSellerOrders(this.user.username, true);
  }

  onProfile(name){
    this.navCtrl.push("ProfilePage",name)
  }

  onDetail(order) {
    this.navCtrl.push(OrderWindowPage, order)
  }

  ionViewDidLoad() {
    console.log();
  }

}
