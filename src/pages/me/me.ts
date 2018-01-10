import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthPage } from '../auth/auth';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { JwtServiceProvider } from '../../providers/jwt-service/jwt-service';

import { Errors } from '../../models/errors.model';

/**
 * Generated class for the MePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {


  placeholderPicture = 'http://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515005723652&di=a1ebb7c0a1b6bfede1ff5ebc057ed073&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D822b27e7b8fb43160e12723948cd2c56%2F6c224f4a20a44623b6b1e24e9222720e0cf3d7a7.jpg';
  isSubmitting = false;
  enableNotifications = true;

  user = {
    name: 'Default user',
    email: '',
    imageUrl: 'assets/img/avatar/marty-avatar.png'
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserServiceProvider,
    private jwtService: JwtServiceProvider,
    private toastCtrl:ToastController,
    ) {
      let user = this.userService.getCurrentUser();
      console.log(user);
      this.user.name = user.username;
      this.user.email = user.email;
      this.user.imageUrl = this.placeholderPicture;
  }

  advertisementsTapped() {
    this.navCtrl.push("AdvertisementsPage");
  }
  trustedTapped() {
    this.navCtrl.push("TrustedPage");
  }
  settingsTapped() {
    this.navCtrl.push("SettingsPage");
  }
  updateProfileImage() {
    this.navCtrl.push("ProfilePage",this.userService.getCurrentUser().username);
  }

  logout(){
    this.isSubmitting = true;
    console.log(this.userService.logout());
    this.userService.logout().subscribe(
      user => {
        console.log("log out !!!!!");
        this.jwtService.destroyToken();
        this.navCtrl.setRoot(AuthPage);
        let tabs = document.querySelectorAll('.tabbar');
        if ( tabs !== null ) {
          Object.keys(tabs).map((key) => {
          });
        } // end if
    
      },
      (errors:Errors) => {
        for(let field in errors.errors){
          this.toastCtrl.create({
            message:`${field} ${errors.errors[field]}`,
            duration:3000
          }).present();
        }
        this.isSubmitting = false;
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MePage');
  }
  
}
