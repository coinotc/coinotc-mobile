import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { OrderWindowPage } from '../pages/order-window/order-window';
import { ChatPage } from '../pages/chat/chat';
import { TradePage } from '../pages/trade/trade';
import { TradeSellEthereumPage } from '../pages/trade-sell-ethereum/trade-sell-ethereum';
import { TradeSellMoneroPage } from '../pages/trade-sell-monero/trade-sell-monero';
import { TradeSellRipplePage } from '../pages/trade-sell-ripple/trade-sell-ripple';
import { TradeSellStellarPage } from '../pages/trade-sell-stellar/trade-sell-stellar';
import { TradeBuyEthereumPage } from '../pages/trade-buy-ethereum/trade-buy-ethereum';
import { TradeBuyMoneroPage } from '../pages/trade-buy-monero/trade-buy-monero';
import { TradeBuyRipplePage } from '../pages/trade-buy-ripple/trade-buy-ripple';
import { TradeBuyStellarPage } from '../pages/trade-buy-stellar/trade-buy-stellar';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SuperTabsModule } from 'ionic2-super-tabs'
import { OrderServiceProvider } from '../providers/order-service/order-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    OrderWindowPage,
    ChatPage,
    TradePage,
    TradeSellEthereumPage,
    TradeSellMoneroPage,
    TradeSellRipplePage,
    TradeSellStellarPage,
    TradeBuyEthereumPage,
    TradeBuyMoneroPage,
    TradeBuyRipplePage,
    TradeBuyStellarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    OrderWindowPage,
    ChatPage,
    TradePage,
    TradeSellEthereumPage,
    TradeSellMoneroPage,
    TradeSellRipplePage,
    TradeSellStellarPage,
    TradeBuyEthereumPage,
    TradeBuyMoneroPage,
    TradeBuyRipplePage,
    TradeBuyStellarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    OrderServiceProvider
  ]
})
export class AppModule { }
