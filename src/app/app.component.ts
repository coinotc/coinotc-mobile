import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { AuthPage } from '../pages/auth/auth';
import * as firebase from 'firebase';
import { OneSignal } from '@ionic-native/onesignal';

const config = {
  apiKey: 'AIzaSyBLdeDmPS6oVmkTkZaypNk2OJvOEnxeRH8',
  authDomain: 'coinotc-kitchensink-chat.firebaseapp.com',
  databaseURL: 'https://coinotc-kitchensink-chat.firebaseio.com/',
  projectId: 'coinotc-kitchensink-chat',
  storageBucket: 'coinotc-kitchensink-chat.appspot.com'
};
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = AuthPage;

  constructor(
    private notification: OneSignal,
    private userService: UserServiceProvider,
    private platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private translate: TranslateService
  ) {
    this.initializeApp();
    translate.setDefaultLang('en');
    firebase.initializeApp(config);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.notification.startInit(
        'a3084480-95c7-4cb5-a8dc-cd01d1c11e09',
        '851246998548'
      );
      this.notification.inFocusDisplaying(
        this.notification.OSInFocusDisplayOption.Notification
      );
      this.notification.setSubscription(true);
      this.notification.handleNotificationReceived().subscribe(() => {
        // your code after Notification received.
      });
      this.notification.handleNotificationOpened().subscribe(() => {
        // your code to handle after Notification opened
      });
      this.notification.endInit();
    });
  }
  ngOnInit() {
    this.userService.populate();
  }
}
