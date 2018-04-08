import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,App} from 'ionic-angular';
import { GaBackupKeyPage } from '../ga-backup-key/ga-backup-key';

/**
 * Generated class for the GoogleAuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-google-auth',
  templateUrl: 'google-auth.html',
})
export class GoogleAuthPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public appCtrl:App) {
  }
  nextPage(){
    this.appCtrl.getRootNav().push(GaBackupKeyPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GoogleAuthPage');
  }

}
