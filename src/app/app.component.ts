import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { AuthPage } from '../pages/auth/auth';
import * as firebase from 'firebase';

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
    private userService: UserServiceProvider,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('cn');
    firebase.initializeApp(config);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit() {
    this.userService.populate();
  }
}
