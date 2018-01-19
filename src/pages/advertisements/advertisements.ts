import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdvertisementServiceProvider } from '../../providers/advertisement-service/advertisement-service';  
/**
 * Generated class for the AdvertisementsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
)
@Component({
  selector: 'page-advertisements',
  templateUrl: 'advertisements.html',
})
export class AdvertisementsPage {
  value = "Active";
  constructor(public navCtrl: NavController, private navParams: NavParams,
    private advertisementService : AdvertisementServiceProvider) {
    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvertisementsPage');
  }
  onTabSelect(tab: { index: number; id: string; }) {
    console.log(`Selected tab: `, tab);
  }
}
