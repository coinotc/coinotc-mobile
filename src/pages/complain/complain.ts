import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { complain } from '../../models/complain';
import { ComplainServiceProvider } from '../../providers/complain-service/complain-service'

/**
 * Generated class for the ComplainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-complain',
  templateUrl: 'complain.html',
})
export class ComplainPage {
  private user;
  private complains:complain[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private userServiceProvider: UserServiceProvider,
  private complainService:ComplainServiceProvider) {
    this.user = this.userServiceProvider.getCurrentUser();
    this.complainService.getComplains(this.user.username).subscribe((result) => {
      this.complains = result;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComplainPage');
  }

}