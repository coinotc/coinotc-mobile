import {
  NgModule,
  ErrorHandler,
  ModuleWithProviders,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthPageModule } from '../pages/auth/auth.module';
import { WalletDetailsPageModule } from '../pages/wallet-details/wallet-details.module';
import { TransferCompletedPageModule } from '../pages/wallet-details/transfer-complete.module';
import { WalletPage } from '../pages/wallet/wallet';
import { TradePage, fiatPopoverPage } from '../pages/trade/trade';
import { AddadvertisementPage } from '../pages/addadvertisement/addadvertisement';
import { OrderListPage } from '../pages/order-list/order-list';
import { AlertPage, AddAlertPage } from '../pages/alert/alert';
import { RoomPageModule } from '../pages/room/room.module';
import { AdinformationPageModule } from '../pages/adinformation/adinformation.module';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OrderServiceProvider } from '../providers/order-service/order-service';
import { AdvertisementServiceProvider } from '../providers/advertisement-service/advertisement-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { JwtServiceProvider } from '../providers/jwt-service/jwt-service';
import { ProfileServiceProvider } from '../providers/profile-service/profile-service';
import { AvatarService } from 'ng-avatar';
import { ComplainServiceProvider } from '../providers/complain-service/complain-service';
import { CryptowalletProvider } from '../providers/cryptowallet/cryptowallet';
import { CurrenciesServiceProvider } from '../providers/currencies/currencies-service';
import { FaIconComponent } from '../components/fa-icon/fa-icon.component';
import { AlertServiceProvider } from '../providers/alert-service/alert-service';
import { MePageModule } from '../pages/me/me.module';
import { ModifyPasswordPageModule } from '../pages/modify-password/modify-password.module';
import { PincodeInputModule } from 'ionic2-pincode-input';
import { PincodePage } from '../pages/pincode/pincode';
import { ConfirmPincodePage } from '../pages/confirm-pincode/confirm-pincode';
import { ProfilePage } from '../pages/profile/profile';
import { ModifyTradepasswordPage } from '../pages/modify-tradepassword/modify-tradepassword';
import { SettingsPage } from '../pages/settings/settings';
import { ComplainInformationPage } from '../pages/complain-information/complain-information';
import { TwoFactorAuthPage } from '../pages/two-factor-auth/two-factor-auth';
import { Camera } from '@ionic-native/camera';
import { FCM } from '@ionic-native/fcm';
import { ComplainPage } from '../pages/complain/complain';
import { AdvertisementsPage } from '../pages/advertisements/advertisements';
import { TrustedPage } from '../pages/trusted/trusted';
import { Network } from '@ionic-native/network';
import { EditAdvertisementPage } from '../pages/edit-advertisement/edit-advertisement';
import { GoogleAuthPage } from '../pages/google-auth/google-auth';
import { GaBackupKeyPage } from '../pages/ga-backup-key/ga-backup-key';
import { GoogleAuthServiceProvider } from '../providers/google-auth-service/google-auth-service';
import { GaEnterKeyPage } from '../pages/ga-enter-key/ga-enter-key';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { firebaseconfig } from '../../environments/firebase-config';
import { SendMailPage } from '../pages/send-mail/send-mail';
import { ModalContentPage } from '../pages/room/room';
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { ForgetVerifySixPinPage } from '../pages/forget-verify-six-pin/forget-verify-six-pin';
import { BannerControlProvider } from '../providers/banner-control/banner-control';
import { SetNewPasswordPage } from '../pages/set-new-password/set-new-password';
import { ForgetTradePasswordTextPage } from '../pages/forget-trade-password-text/forget-trade-password-text';
import { ConfirmTradePasswordCodePage } from '../pages/confirm-trade-password-code/confirm-trade-password-code';
import { ResetTradePasswordPage } from '../pages/reset-trade-password/reset-trade-password';
import { ConfirmResetTradePasswordPage } from '../pages/confirm-reset-trade-password/confirm-reset-trade-password';
import { CustomerSupportPage } from '../pages/customer-support/customer-support';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NotificationServiceProvider } from '../providers/notification-service/notification-service';
import { GoogleAuthInputPage } from '../pages/google-auth-input/google-auth-input';
import { UnbindGoogleAuthPage } from '../pages/unbind-google-auth/unbind-google-auth';
import { GetIpProvider } from '../providers/get-ip/get-ip';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { Device } from '@ionic-native/device';
import { KycFormPage } from '../pages/kyc-form/kyc-form';
import { CountryServiceProvider } from '../providers/country-service/country-service';
import { KycPassportPhoto1Page } from '../pages/kyc-passport-photo1/kyc-passport-photo1';
import { KycPassportPhoto2Page } from '../pages/kyc-passport-photo2/kyc-passport-photo2';
import { KycServiceProvider } from '../providers/kyc-service/kyc-service';
import { KycListPage } from '../pages/kyc-list/kyc-list';
import { Badge } from '@ionic-native/badge';
import { SearchPipe } from '../pages/trade/trade';
import { ServersideTimeServiceProvider } from '../providers/serverside-time-service/serverside-time-service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ViewMyAdvertisementPage } from '../pages/view-my-advertisement/view-my-advertisement';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Clipboard } from '@ionic-native/clipboard';
import { BrowserTab } from '@ionic-native/browser-tab';
const rootRouting: ModuleWithProviders = RouterModule.forRoot([], {
  useHash: true
});

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translate/', '.json');
}

class CoinOTCIonicErrorHandler extends ErrorHandler {
  constructor(){
    super();
  }

  handleError(err: any){
    console.log(err);
    // send to an endpoint to send email to alert the development team.
  }
}

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    WalletPage,
    TradePage,
    AddadvertisementPage,
    OrderListPage,
    AlertPage,
    AddAlertPage,
    FaIconComponent,
    PincodePage,
    ConfirmPincodePage,
    ProfilePage,
    ModifyTradepasswordPage,
    SettingsPage,
    ComplainInformationPage,
    ComplainPage,
    AdvertisementsPage,
    TrustedPage,
    fiatPopoverPage,
    EditAdvertisementPage,
    TwoFactorAuthPage,
    GoogleAuthPage,
    GaBackupKeyPage,
    GaEnterKeyPage,
    SendMailPage,
    ModalContentPage,
    ForgetPasswordPage,
    ForgetVerifySixPinPage,
    SetNewPasswordPage,
    ForgetTradePasswordTextPage,
    ConfirmTradePasswordCodePage,
    ResetTradePasswordPage,
    ConfirmResetTradePasswordPage,
    CustomerSupportPage,
    GoogleAuthInputPage,
    UnbindGoogleAuthPage,
    TutorialPage,
    KycFormPage,
    KycPassportPhoto1Page,
    KycPassportPhoto2Page,
    KycListPage,
    SearchPipe,
    ViewMyAdvertisementPage
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,
       { mode: 'md',
       backButtonIcon: "ios-arrow-back" }
      ),
    HttpClientModule,
    HttpModule,
    rootRouting,
    AuthPageModule,
    PincodeInputModule,
    MePageModule,
    RoomPageModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AdinformationPageModule,
    Ionic2RatingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFireStorageModule,
    ModifyPasswordPageModule,
    IonicImageViewerModule,
    WalletDetailsPageModule,
    TransferCompletedPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    WalletPage,
    TradePage,
    AddadvertisementPage,
    OrderListPage,
    AlertPage,
    AddAlertPage,
    PincodePage,
    ConfirmPincodePage,
    ProfilePage,
    ModifyTradepasswordPage,
    SettingsPage,
    ComplainInformationPage,
    ComplainPage,
    AdvertisementsPage,
    TrustedPage,
    fiatPopoverPage,
    EditAdvertisementPage,
    TwoFactorAuthPage,
    GoogleAuthPage,
    GaBackupKeyPage,
    GaEnterKeyPage,
    SendMailPage,
    ModalContentPage,
    ForgetPasswordPage,
    ForgetVerifySixPinPage,
    SetNewPasswordPage,
    ForgetTradePasswordTextPage,
    ConfirmTradePasswordCodePage,
    ResetTradePasswordPage,
    ConfirmResetTradePasswordPage,
    CustomerSupportPage,
    GoogleAuthInputPage,
    UnbindGoogleAuthPage,
    TutorialPage,
    KycFormPage,
    KycPassportPhoto1Page,
    KycPassportPhoto2Page,
    KycListPage,
    ViewMyAdvertisementPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: CoinOTCIonicErrorHandler },
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
    CurrenciesServiceProvider,
    AlertServiceProvider,
    Camera,
    FCM,
    Network,
    GoogleAuthServiceProvider,
    PhotoViewer,
    BannerControlProvider,
    LocalNotifications,
    NotificationServiceProvider,
    GetIpProvider,
    IonicImageViewerModule,
    Device,
    CountryServiceProvider,
    KycServiceProvider,
    Badge,
    ServersideTimeServiceProvider,
    CountryServiceProvider,
    SocialSharing,
    BarcodeScanner,
    Clipboard,
    BrowserTab
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
