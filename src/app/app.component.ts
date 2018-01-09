import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserServiceProvider } from '../providers/user-service/user-service';

import { AuthPage } from '../pages/auth/auth';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = AuthPage;

  constructor(private userService: UserServiceProvider,
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    let config = {
      apiKey: "AIzaSyDnDHVLJ2H3mI-eXBF9oldYhr9olRkalKs",
      authDomain: "chat-cb8c1.firebaseapp.com",
      databaseURL: "https://chat-cb8c1.firebaseio.com",
      projectId: "chat-cb8c1",
      storageBucket: "chat-cb8c1.appspot.com",
      messagingSenderId: "265407788958"
    };
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
