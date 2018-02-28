import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { User } from '../../models/user.model';
/**
 * Generated class for the RealNameVerifiedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-real-name-verified',
  templateUrl: 'real-name-verified.html',
})
export class RealNameVerifiedPage {
  private user;
  model = new User('','','','','',null,null,'','',null,null,null,null, null);
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private userService:UserServiceProvider) {
    this.user = this.userService.getCurrentUser();
    this.model.verifyName = this.user.verifyName;
    this.model.idCard = this.user.idCard;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RealNameVerifiedPage');
  }
  submit(){
    this.user.verifyName = this.model.verifyName;
    this.user.idCard = this.model.idCard;
    this.userService.update(this.user).subscribe();
  }
}
