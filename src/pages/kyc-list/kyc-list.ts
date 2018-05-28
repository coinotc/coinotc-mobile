import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { User } from '../../models/user.model';
import { KycFormPage } from '../kyc-form/kyc-form';
import { KycPassportPhoto1Page } from '../kyc-passport-photo1/kyc-passport-photo1';
import { KycPassportPhoto2Page } from '../kyc-passport-photo2/kyc-passport-photo2';

/**
 * Generated class for the KycListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kyc-list',
  templateUrl: 'kyc-list.html',
})
export class KycListPage {
  user = new User(
    '',
    '',
    '',
    '',
    '',
    0,
    0,
    null,
    null,
    '',
    '',
    null,
    null,
    false,
    0,
    '',
    '',
    '',
    '',
    '',
    '',
    null,
    null,
    0,
    0,
    0,
    '',
    '',
    ''
  )
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserServiceProvider) {
    this.userService.getUser().subscribe(result => {
      console.log(result.firstName)
      this.user = result;
      console.log(this.user)
    })
    
  }
  goVerifyKYCName(){
    console.log(this.user.verifyKYCName)
    if(this.user.verifyKYCName == 0)
    this.navCtrl.push(KycFormPage);
  }
  goPassportPhoto(){
    if(this.user.verifyPassportPhoto == 0)
    this.navCtrl.push(KycPassportPhoto1Page)
  }
  goSelfie(){
    if(this.user.verifySelfie == 0)
    this.navCtrl.push(KycPassportPhoto2Page)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad KycListPage');
  }
  ionViewWillEnter() {
    this.userService.getUser().subscribe(result => {
      console.log(result.firstName)
      this.user = result;
      console.log(this.user)
    })
  }
}
