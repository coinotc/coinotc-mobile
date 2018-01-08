import { Component } from '@angular/core';

import { OrderListPage } from '../order-list/order-list';
import { MePage } from '../me/me';
import { WalletPage } from '../wallet/wallet';
import { TradePage } from '../trade/trade';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabRoots: Object[];

  constructor() {
    this.tabRoots = [{
      root:TradePage,
      title: 'Trade',
      icon: 'logo-bitcoin'
    }, {
      root: OrderListPage,
      title: 'OrderList',
      icon :'list'
    }, {
      root: WalletPage,
      title: 'Wallet',
      icon: 'document'
    }, {
      root: MePage,
      title: 'Me',
      icon: 'person'
    }]
  }
}
