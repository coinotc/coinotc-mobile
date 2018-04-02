import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
        icon: 'swap'
      },
      {
        root: OrderListPage,
        title: 'OrderList',
        icon: 'filing'
      },
      {
        root: AlertPage,
        title: 'Alerts',
        icon: 'alarm'
      },
      {
        root: WalletPage,
        title: 'Wallet',
        icon: 'logo-bitcoin'
      },
      {
        root: MePage,
        title: 'Me',
        icon: 'person'
      }
    ];
  }
}
