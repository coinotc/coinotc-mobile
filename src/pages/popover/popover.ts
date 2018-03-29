import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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
  country: string; fiat: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }
  ngOnInit() {
    if (this.navParams.data) {
      this.country = this.navParams.data.country;
      this.fiat = this.navParams.data.fiat;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }
  ionViewWillLeave() {
    console.log('here');
    this.viewCtrl.dismiss({ country: this.country, fiat: this.fiat });
    //this.viewCtrl.onWillDismiss(() => {
    //})
  }
}
