import { NgModule, ErrorHandler, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';



import { TabsPage } from '../pages/tabs/tabs';
import { OrderWindowPage } from '../pages/order-window/order-window';
import { ChatPage } from '../pages/chat/chat';
import { MePageModule } from '../pages/me/me.module';
import { AuthPageModule } from '../pages/auth/auth.module';
import { WalletPage } from '../pages/wallet/wallet';
import { TradePage } from '../pages/trade/trade';
import { AddadvertisementPage } from '../pages/addadvertisement/addadvertisement'
import { OrderListPage } from '../pages/order-list/order-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OrderServiceProvider } from '../providers/order-service/order-service';
import { AdvertisementServiceProvider } from '../providers/advertisement-service/advertisement-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { JwtServiceProvider } from '../providers/jwt-service/jwt-service';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    OrderWindowPage,
    ChatPage,
    WalletPage,
    TradePage,
    AddadvertisementPage,
    OrderListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot(),
    MePageModule,
    AuthPageModule,
    HttpClientModule,
    HttpModule,
    rootRouting,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    OrderWindowPage,
    ChatPage,
    WalletPage,
    TradePage,
    AddadvertisementPage,
    OrderListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    OrderServiceProvider,
    AdvertisementServiceProvider,
    UserServiceProvider,
    ApiServiceProvider,
    JwtServiceProvider,
    HttpModule,
    HttpClientModule,
    IonicStorageModule
    
  ]
})
export class AppModule { }
