import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { GoogleAuthServiceProvider } from '../../providers/google-auth-service/google-auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { GaEnterKeyPage } from '../ga-enter-key/ga-enter-key';
/**
 * Generated class for the GaBackupKeyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ga-backup-key',
  templateUrl: 'ga-backup-key.html',
})
export class GaBackupKeyPage {
  private backupKey;
  private user;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public googleAuthService:GoogleAuthServiceProvider,
  public userService:UserServiceProvider,
  public appCtrl:App) {
    this.user = this.userService.getCurrentUser()
    this.googleAuthService.getBackupKey(this.user.username).subscribe(result=>{
      this.backupKey = result;
      console.log(this.backupKey )
    })
    
  }
  nextPage(){
    this.appCtrl.getRootNav().push(GaEnterKeyPage,{backupKey:this.backupKey});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GaBackupKeyPage');
  }

}
