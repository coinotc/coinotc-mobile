import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { User } from '../../models/user.model';
import { TabsPage } from '../../pages/tabs/tabs';
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
  model = new User("","","","","",0,0,"","",null,null,[],[], "");
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userService:UserServiceProvider) {
      this.user = this.userService.getCurrentUser();
      this.model.email = this.user.email;
      this.model.email = this.user.username;
      console.log(this.model.tradePrd)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPrdPage');
  }
  submit(){
    console.log(this.model.tradePrd)
    this.user.tradePrd = this.model.tradePrd;
    console.log(this.user)
    this.userService.update(this.user).subscribe(user=>{
      this.navCtrl.push(TabsPage);
      
    });

  }
}
