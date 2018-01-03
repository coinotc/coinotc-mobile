import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

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
    },{
      root: ContactPage,
      title: 'Contact',
      icon: 'notifications'
    },{
      root: AboutPage,
      title: 'About',
      icon: 'document'
    }]
  }
}
