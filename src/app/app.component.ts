import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { AuthPage } from '../pages/auth/auth';
import { TabsPage } from '../pages/tabs/tabs';
import * as firebase from 'firebase';
import { firebaseconfig } from '../../environments/firebase-config';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { NotificationServiceProvider } from '../providers/notification-service/notification-service';
import { Subscription } from 'rxjs';
import { TutorialPage } from '../pages/tutorial/tutorial';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  private timerSubscription: AnonymousSubscription;
  rootPage: any = AuthPage;
  profileBadge: number;
  private onResumeSubscription: Subscription;
  private onPauseSubscription: Subscription;
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
    //this.rootPage = AuthPage;
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
      }).then(() => this.storage.get('isLogin') as Promise<string>)
      .then(value => {
        if (value)
          this.rootPage = TabsPage;
      });
    this.onResumeSubscription = platform.resume.subscribe(() => {
      console.log('there is resume');
      console.log(this.userService.getCurrentUser().username);
      if (this.userService.getCurrentUser().username != "" && this.userService.isLoggedIn()) {
        //this.rootPage = TabsPage;
        this.userService.changeOnlineStatus(true).subscribe();
      }
      // do something meaningful when the app is put in the foreground
    });
    this.onPauseSubscription = platform.pause.subscribe(() => {
      console.log('there is pause');
      if (this.userService.getCurrentUser().username !== undefined)
        this.userService.changeOnlineStatus(false).subscribe();
    });
    firebase.initializeApp(firebaseconfig);
    platform.ready().then(() => {
      console.log(this.userService.getCurrentUser());
      console.log(this.userService.isLoggedIn())
      // if (this.userService.getCurrentUser().username != "" && this.userService.isLoggedIn()) {
      //   this.rootPage = TabsPage;
        //this.userService.changeOnlineStatus(true).subscribe();
      //}
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  // private subscribeToData(): void {
  //   this.timerSubscription = Observable.timer(90000).subscribe(() =>
  //     this.refreshData()
  //   );
  // }

  // private refreshData() {
  //   let username = this.userService.getCurrentUser().username;
  //   this.notificationService.getNotifications(username).subscribe(result => {
  //     if (result.length) {
  //       for (let i = 0; i < result.length; i++) {
  //         this.localNotifications.schedule({
  //           id: Math.random() * 100000,
  //           text: result[i].message,
  //           sound: null
  //         });
  //         let readID = result[i]._id;
  //         this.notificationService
  //           .deleteNotifications(readID)
  //           .subscribe(result => {
  //             console.log('Delete ID: ' + readID);
  //           });
  //       }
  //     }
  //     this.subscribeToData();
  //   });
  // }

  // ionViewWillEnter() {
  //   this.refreshData();
  // }
  ngOnDestroy() {
    // always unsubscribe your subscriptions to prevent leaks
    // this.onResumeSubscription.unsubscribe();
    // this.onPauseSubscription.unsubscribe();
  }
  ngOnInit() {
    this.userService.populate();
    // this.refreshData();
  }
}
