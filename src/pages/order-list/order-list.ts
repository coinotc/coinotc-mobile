import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Observable } from 'rxjs/Observable';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { OrderWindowPage } from '../order-window/order-window';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { OrderInformation } from '../order-window/orderInformation';
import { RoomPage } from '../room/room';
/**
 * Generated class for the OrderListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html'
})
export class OrderListPage {
  private buyerActiveOrders: OrderInformation[];
  private sellerActiveOrders: OrderInformation[];
  private buyerFinishedOrders: OrderInformation[];
  private sellerFinishedOrders: OrderInformation[];
  private user;
  segments = 'ActiveBuy';
  status = 'Active';
  placeholderPicture = 'http://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515005723652&di=a1ebb7c0a1b6bfede1ff5ebc057ed073&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D822b27e7b8fb43160e12723948cd2c56%2F6c224f4a20a44623b6b1e24e9222720e0cf3d7a7.jpg';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private orderServiceProvider: OrderServiceProvider,
    private userServiceProvider: UserServiceProvider
  ) {
    this.user = this.userServiceProvider.getCurrentUser();
    // this.buyerActiveOrders = this.orderServiceProvider.getBuyerOrders(this.user.username, false);
    // this.sellerActiveOrders = this.orderServiceProvider.getSellerOrders(this.user.username, false);
    // this.buyerFinishedOrders = this.orderServiceProvider.getBuyerOrders(this.user.username, true);
    // this.sellerFinishedOrders = this.orderServiceProvider.getSellerOrders(this.user.username, true);
    this.doRefresh();
  }

  onDetail(order, trader) {
<<<<<<< HEAD
    this.navCtrl.push(OrderWindowPage, { order, trader });
=======
    this.navCtrl.push(RoomPage, {order, trader})
>>>>>>> dce9196d32d018a303fa88deb3d18ac2ab1938f9
  }

  onSegment() {
    this.doRefresh();
  }

  doRefresh(refresher?) {
    switch (this.segments) {
      case 'ActiveBuy':
        this.orderServiceProvider
          .getBuyerOrders(this.user.username, false)
          .subscribe(result => {
            this.buyerActiveOrders = result;
            if (refresher) {
              refresher.complete();
            }
          });
        break;
      case 'FinishedBuy':
        this.orderServiceProvider
          .getBuyerOrders(this.user.username, true)
          .subscribe(result => {
            this.buyerFinishedOrders = result;
            if (refresher) {
              refresher.complete();
            }
          });
        break;
      case 'ActiveSell':
        this.orderServiceProvider
          .getSellerOrders(this.user.username, false)
          .subscribe(result => {
            this.sellerActiveOrders = result;
            if (refresher) {
              refresher.complete();
            }
          });
        break;
      case 'FinishedSell':
        this.orderServiceProvider
          .getSellerOrders(this.user.username, true)
          .subscribe(result => {
            this.sellerFinishedOrders = result;
            if (refresher) {
              refresher.complete();
            }
          });
        break;
    }
  }

  ionViewDidLoad() {
    console.log();
  }
}
