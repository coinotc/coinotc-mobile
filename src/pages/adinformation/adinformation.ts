import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { adinformation } from '../../models/adinformation';
import { UserServiceProvider } from '../../providers/user-service/user-service'

/**
 * Generated class for the AdinformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adinformation',
  templateUrl: 'adinformation.html',
})
export class AdinformationPage {
  information: adinformation; title: string; tradetype: { type: String, crypto: String }; user:{
    order: 200,
    goodorder: 148,
  };range;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserServiceProvider) {
    this.tradetype = navParams.data.tradetype;
    this.information = navParams.data.information;
    this.title = `${this.tradetype.type} ${this.tradetype.crypto}`
    console.log(this.information); console.log(this.tradetype);
    this.user = {
      order: 200,
      goodorder: 148,
    }
    this.range = Math.trunc(this.user.goodorder / this.user.order);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdinformationPage');
  }

}
