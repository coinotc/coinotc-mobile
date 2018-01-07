import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { OrderListPage } from '../order-list/order-list';
import { OrderWindowPage } from '../order-window/order-window';
import { ChatPage } from '../chat/chat';
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
      root: ChatPage,
      title: 'Chat',
      icon: 'chatboxes'
    }, {
      root: ContactPage,
      title: 'Contact',
      icon: 'notifications'
    }, {
      root: AboutPage,
      title: 'About',
      icon: 'document'
    }]
  }
}
