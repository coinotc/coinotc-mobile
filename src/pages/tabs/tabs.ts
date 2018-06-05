import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { OrderListPage } from '../order-list/order-list';
import { MePage } from '../me/me';
import { WalletPage } from '../wallet/wallet';
import { TradePage } from '../trade/trade';
import { AlertPage } from '../alert/alert';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabRoots: any[];
  //profileBadge = 0;

  constructor(
    public userService: UserServiceProvider,
    public navCtrl: NavController,
    public events: Events
  ) {
    // .then(() => this.userService.changeBadges(this.profileBadge));
    // this.userService.castBadges.subscribe(result => {
    //   this.profileBadge = result;
    // });
    this.tabRoots = [
      {
        root: TradePage,
        title: 'Trade',
        icon: 'swap',
        badge: 0
      },
      {
        root: OrderListPage,
        title: 'OrderList',
        icon: 'filing',
        badge: 0
      },
      {
        root: AlertPage,
        title: 'Alerts',
        icon: 'alarm',
        badge: 0
      },
      {
        root: WalletPage,
        title: 'Wallet',
        icon: 'logo-bitcoin',
        badge: 0
      },
      {
        root: MePage,
        title: 'Me',
        icon: 'person',
        badge: 0
      }
    ];
    events.subscribe('orderBadge:updated', _badgeValue => {
      console.log(_badgeValue);
      this.tabRoots[1].badge = _badgeValue.length;
    });
    events.subscribe('profileBadge:updated', _badgeValue => {
      this.tabRoots[4].badge = _badgeValue;
      console.log(this.tabRoots[4].badge);
    });
  }
}
