import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { OrderListPage } from '../order-list/order-list';
import { MePage } from '../me/me';
import { WalletPage } from '../wallet/wallet';
import { TradePage } from '../trade/trade';
import { AlertPage } from '../alert/alert';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabRoots: any[];
  profileBadge: any;

  constructor(
    public userService: UserServiceProvider,
    public navCtrl: NavController,
    public events: Events,
    public detectorRef: ChangeDetectorRef
  ) {
    this.userService.castBadges.subscribe(result => {
      this.profileBadge = result;
    });
    this.tabRoots = [
      {
        root: TradePage,
        title: 'Trade',
        icon: 'swap',
        badge: null
      },
      {
        root: OrderListPage,
        title: 'OrderList',
        icon: 'filing',
        badge: null
      },
      {
        root: AlertPage,
        title: 'Alerts',
        icon: 'alarm',
        badge: null
      },
      {
        root: WalletPage,
        title: 'Wallet',
        icon: 'logo-bitcoin',
        badge: null
      },
      {
        root: MePage,
        title: 'Me',
        icon: 'person',
        badge: this.profileBadge
      }
    ];
    events.subscribe('profileBadge:updated', _badgeValue => {
      this.tabRoots[4].badge = _badgeValue;
    });
  }
}
