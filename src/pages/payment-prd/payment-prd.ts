import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { User } from '../../models/user.model';

/**
 * Generated class for the PaymentPrdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-prd',
  templateUrl: 'payment-prd.html',
})
export class PaymentPrdPage {
  private user;
  model = new User('','','','','',null,null,'','',null,null,null,null, null);
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userService:UserServiceProvider) {
      this.user = this.userService.getCurrentUser();
      this.model.tradePrd = this.user.tradePrd;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPrdPage');
  }
  submit(){
    this.user.tradePrd = this.model.tradePrd;
    this.userService.update(this.user).subscribe();
  }
}
