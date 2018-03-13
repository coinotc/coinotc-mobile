import { Component } from '@angular/core';
import { NavController, Alert } from 'ionic-angular';
import { OrderListPage } from '../order-list/order-list';
import { MePage } from '../me/me';
import { WalletPage } from '../wallet/wallet';
import { TradePage } from '../trade/trade';
import { AlertPage } from '../alert/alert';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabRoots: Object[];

  constructor(
    public userService: UserServiceProvider,
    public navCtrl: NavController
  ) {
    this.tabRoots = [
      {
        root: TradePage,
        title: 'Trade',
        icon: 'logo-bitcoin'
      },
      {
        root: OrderListPage,
        title: 'OrderList',
        icon: 'list'
      },
      {
        root: AlertPage,
        title: 'Alerts',
        icon: 'alarm'
      },
      {
        root: WalletPage,
        title: 'Wallet',
        icon: 'document'
      },
      {
        root: MePage,
        title: 'Me',
        icon: 'person'
      }
    ];
  }
}
