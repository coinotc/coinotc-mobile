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
import { AddadvertisementPage } from '../pages/addadvertisement/addadvertisement'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SuperTabsModule } from 'ionic2-super-tabs'
import { OrderServiceProvider } from '../providers/order-service/order-service';
import { AdvertisementServiceProvider } from '../providers/advertisement-service/advertisement-service';

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
    AddadvertisementPage,
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
    AddadvertisementPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    OrderServiceProvider,
    AdvertisementServiceProvider
  ]
})
export class AppModule { }
