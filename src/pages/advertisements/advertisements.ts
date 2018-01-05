import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
  
/**
 * Generated class for the AdvertisementsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'partial-home/:type'
})
@Component({
  selector: 'page-advertisements',
  templateUrl: 'advertisements.html',
})
export class AdvertisementsPage {

  page1: any = 'AdActivePage';
  page2: any = 'AdDisabledPage';

  showIcons: boolean = false;
  showTitles: boolean = true;
  pageTitle: string = 'Partial Home';

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    // const type = navParams.get('type');
    // switch (type) {
    //   case 'icons-only':
    //     this.showTitles = false;
    //     this.pageTitle += ' - Icons only';
    //     break;

    //   case 'titles-only':
    //     this.showIcons = false;
    //     this.pageTitle += ' - Titles only';
    //     break;
    // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvertisementsPage');
  }
  onTabSelect(tab: { index: number; id: string; }) {
    console.log(`Selected tab: `, tab);
  }
}
