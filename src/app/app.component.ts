import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { AuthPage } from '../pages/auth/auth';
import * as firebase from 'firebase';
import { OneSignal } from '@ionic-native/onesignal';
import { FCM, NotificationData } from '@ionic-native/fcm';

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
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private translate: TranslateService,
    private fcm: FCM
  ) {
    this.initializeFCM();
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
  initializeFCM() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fcm
        .getToken()
        .then((token: string) => {
          console.log('The token to use is: ', token);
        })
        .catch(error => {
          console.error(error);
        });
      this.fcm
        .onTokenRefresh()
        .subscribe(
          (token: string) => console.log('Nuevo token', token),
          error => console.error(error)
        );
      this.fcm.onNotification().subscribe(
        (data: NotificationData) => {
          if (data.wasTapped) {
            console.log('Received in background', JSON.stringify(data));
          } else {
            console.log('Received in foreground', JSON.stringify(data));
          }
        },
        error => {
          console.error('Error in notification', error);
        }
      );
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
