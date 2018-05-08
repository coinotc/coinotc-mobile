import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { AuthPage } from '../pages/auth/auth';
import * as firebase from 'firebase';
import { firebaseconfig } from '../../environments/firebase-config';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { NotificationServiceProvider } from '../providers/notification-service/notification-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  private timerSubscription: AnonymousSubscription;
  rootPage: any = AuthPage;

  constructor(
    private userService: UserServiceProvider,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private translate: TranslateService,
    private notificationService: NotificationServiceProvider,
    private localNotifications: LocalNotifications,
    private storage: Storage
  ) {
    this.storage
      .ready()
      .then(() => this.storage.get('preferLanguage') as Promise<string>)
      .then(value => {
        if (value != null) {
          let langObj = JSON.parse(JSON.stringify(value));
          translate.setDefaultLang(langObj.language);
        } else {
          translate.setDefaultLang('en');
        }
      });

    firebase.initializeApp(firebaseconfig);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  private subscribeToData(): void {
    this.timerSubscription = Observable.timer(5000).subscribe(() =>
      this.refreshData()
    );
  }

  private refreshData() {
    let username = this.userService.getCurrentUser().username;
    this.notificationService.getNotifications(username).subscribe(result => {
      if (result.length) {
        for (let i = 0; i < result.length; i++) {
          this.localNotifications.schedule({
            id: result[i].username,
            text: result[i].message,
            sound: null
          });
          let readID = result[i]._id;
          this.notificationService
            .deleteNotifications(readID)
            .subscribe(result => {
              console.log('Delete ID: ' + readID);
            });
        }
      }
      this.subscribeToData();
    });
  }

  ngOnInit() {
    this.userService.populate();
    this.refreshData();
  }
}
