import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { OrderWindowPage } from '../pages/order-window/order-window';
import { ChatPage } from '../pages/chat/chat';
import { MePageModule } from '../pages/me/me.module';
import { WalletPage } from '../pages/wallet/wallet';
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
import { OrderServiceProvider } from '../providers/order-service/order-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { JwtServiceProvider } from '../providers/jwt-service/jwt-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    OrderWindowPage,
    ChatPage,
    WalletPage,
    TradePage,
    TradeSellEthereumPage,
    TradeSellMoneroPage,
    TradeSellRipplePage,
    TradeSellStellarPage,
    TradeBuyStellarPage,
    TradeBuyEthereumPage,
    TradeBuyMoneroPage,
    TradeBuyRipplePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot(),
    MePageModule,
    HttpClientModule,
    HttpModule
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
    WalletPage,
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
    OrderServiceProvider,
    UserServiceProvider,
    ApiServiceProvider,
    JwtServiceProvider
  ]
})
export class AppModule { }
