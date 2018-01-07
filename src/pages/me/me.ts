import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { AuthPage } from '../auth/auth';
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

 
  placeholderPicture = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515005723652&di=a1ebb7c0a1b6bfede1ff5ebc057ed073&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D822b27e7b8fb43160e12723948cd2c56%2F6c224f4a20a44623b6b1e24e9222720e0cf3d7a7.jpg';

  enableNotifications = true;

  user = {
    name: 'Marty Mcfly',
    imageUrl: 'assets/img/avatar/marty-avatar.png'
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl:ModalController
    ) {
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
  }

  logOut() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MePage');
  }
  login(){
    let modal = this.modalCtrl.create(AuthPage, {
      isModal:true
    });
    modal.present();
  }
}
