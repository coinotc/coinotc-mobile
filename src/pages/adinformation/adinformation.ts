import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { adinformation } from '../../models/adinformation';

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
  information: adinformation; title: string; tradetype: {type: String, crypto: String};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tradetype = navParams.data.tradetype;
    this.information = navParams.data.information;
    this.title = `${this.tradetype.type} ${this.tradetype.crypto}`
    console.log(this.information); console.log(this.tradetype);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdinformationPage');
  }

}
