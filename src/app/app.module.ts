import { NgModule, ErrorHandler, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

import { TabsPage } from '../pages/tabs/tabs';
import { ChatPage } from '../pages/chat/chat';
import { MePageModule } from '../pages/me/me.module';
import { AuthPageModule } from '../pages/auth/auth.module';
import { WalletPage } from '../pages/wallet/wallet';
import { TradePage } from '../pages/trade/trade';
import { AddadvertisementPage } from '../pages/addadvertisement/addadvertisement'
import { OrderListPage } from '../pages/order-list/order-list';
import { AdinformationPage } from '../pages/adinformation/adinformation'
import { OrderWindowPageModule } from '../pages/order-window/order-window.module';
import { RoomPageModule } from '../pages/room/room.module'
import { AdinformationPageModule} from '../pages/adinformation/adinformation.module';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OrderServiceProvider } from '../providers/order-service/order-service';
import { AdvertisementServiceProvider } from '../providers/advertisement-service/advertisement-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { JwtServiceProvider } from '../providers/jwt-service/jwt-service';
import { ProfileServiceProvider } from '../providers/profile-service/profile-service';
import { AvatarService } from 'ng-avatar'
import { ComplainServiceProvider } from '../providers/complain-service/complain-service';
import { CryptowalletProvider } from '../providers/cryptowallet/cryptowallet';
import { CurrenciesServiceProvider } from '../providers/currencies/currencies-service';
import { PaymentPrdPageModule } from '../pages/payment-prd/payment-prd.module';
const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translate/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
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
    OrderWindowPageModule,
    RoomPageModule,
    PaymentPrdPageModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AdinformationPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
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
    IonicStorageModule,
    ProfileServiceProvider,
    AvatarService,
    ComplainServiceProvider,
    CryptowalletProvider,
    CurrenciesServiceProvider

  ]
})


export class AppModule { }
