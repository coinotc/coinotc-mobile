import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  china: boolean;
  singapore: boolean;
  rmb: boolean;
  sgd: boolean;

  updateChina() {
    console.log('China selected:' + this.china);
  }
  
  updateSingapore() {
    console.log('Singapore selected:' + this.singapore);
  }
  
  updateRMB() {
    console.log('RMB selected:' + this.rmb);
  }
  
  updateSGD() {
    console.log('SGD selected:' + this.sgd);
  }
}
