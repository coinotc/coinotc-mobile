import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { complain } from '../../models/complain';
import { ComplainServiceProvider } from '../../providers/complain-service/complain-service';
/**
 * Generated class for the ComplainInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-complain-information',
  templateUrl: 'complain-information.html',
})
export class ComplainInformationPage {
  orderInformation;
  compainUser;
  model = new complain('','','',0,'',null);
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private userService:UserServiceProvider,
  private complainService:ComplainServiceProvider
  ) {
    this.orderInformation = this.navParams.data;
    this.compainUser = this.userService.getCurrentUser().username == this.orderInformation.seller ? this.orderInformation.buyer : this.orderInformation.seller; 
    //console.log(this.compainUser)
  }

  submit(){
    this.model.pleader = this.compainUser;
    this.model.complainant = this.userService.getCurrentUser().username;
    this.model.orderId = this.orderInformation._id;
    console.log(this.model);
    this.complainService.sendComplain(this.model).subscribe(result => {
      console.log(result);
      this.navCtrl.pop();
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ComplainInformationPage');
  }

}
