import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { OrderWindowPage } from '../order-window/order-window';
import { ChatPage } from '../chat/chat';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabRoots: Object[];

  constructor() {
    this.tabRoots = [{
      root: HomePage,
      title: 'Home',
      icon: 'home'
    }, {
      root: OrderWindowPage,
      title: 'OrderWindow',
      icon: 'paper'
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
