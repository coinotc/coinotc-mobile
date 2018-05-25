import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  App,
  LoadingController
} from 'ionic-angular';
import { AdvertisementServiceProvider } from '../../providers/advertisement-service/advertisement-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { advertisement } from '../../models/advertisement';
import { AdinformationPage } from '../adinformation/adinformation';
import { EditAdvertisementPage } from '../edit-advertisement/edit-advertisement';
import { SocialSharing } from '@ionic-native/social-sharing';
/**
 * Generated class for the AdvertisementsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-advertisements',
  templateUrl: 'advertisements.html'
})
export class AdvertisementsPage {
  private activeAdvertisement: advertisement[];
  private disableAdvertisement: advertisement[];
  value = 'Active';
  private user;
  constructor(
    public navCtrl: NavController,
    private advertisementService: AdvertisementServiceProvider,
    private appCtrl: App,
    private userServiceProvider: UserServiceProvider,
    private loadingCtrl: LoadingController,
    private socialSharing: SocialSharing
  ) {
    this.user = this.userServiceProvider.getCurrentUser();
    this.doRefresh();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvertisementsPage');
  }
  onTabSelect(tab: { index: number; id: string }) {
    console.log(`Selected tab: `, tab);
  }
  onSegment(value) {
    //console.log(this.value)
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'loading...'
      //duration: 3500
    });
    console.log(value);
    switch (value) {
      case 'Active':
        this.advertisementService
          .getMyadvertisement(this.user.username, true)
          .subscribe(result => {
            this.activeAdvertisement = result;
            loading.dismiss();
          });
        break;
      case 'Disabled':
        this.advertisementService
          .getMyadvertisement(this.user.username, false)
          .subscribe(result => {
            this.disableAdvertisement = result;
            loading.dismiss();
          });
        break;
    }
  }
  doRefresh(refresher?) {
    switch (this.value) {
      case 'Active':
        this.advertisementService
          .getMyadvertisement(this.user.username, true)
          .subscribe(result => {
            this.activeAdvertisement = result;
            if (refresher) {
              refresher.complete();
            }
          });
        break;
      case 'Disabled':
        this.advertisementService
          .getMyadvertisement(this.user.username, false)
          .subscribe(result => {
            this.disableAdvertisement = result;
            if (refresher) {
              refresher.complete();
            }
          });
        break;
    }
  }
  read(information) {
    console.log(information);
    this.appCtrl.getRootNav().push(AdinformationPage, {
      information: information,
      tradetype: { type: 'My', crypto: 'Advertisement', ismine: true }
    });
  }
  setVisible(information) {
    this.advertisementService
      .changeVisible(information._id, information.visible)
      .subscribe(result => {
        this.doRefresh();
      });
  }
  compilemsg(index): string {
    var msg =
      this.activeAdvertisement[index].crypto +
      '-' +
      this.activeAdvertisement[index].owner;
    return msg.concat('\n Look into it !');
  }
  onShare(index) {
    var msg = this.compilemsg(index);
    this.socialSharing.shareViaWhatsApp(msg, null, 'https://coinotc.market/');
  }
  delete(information) {
    this.advertisementService
      .deleteSatatus(information._id)
      .subscribe(result => {
        this.doRefresh();
      });
  }
  edit(information) {
    console.log(information.crypto + 'edit');
    this.appCtrl
      .getRootNav()
      .push(EditAdvertisementPage, { information: information, type: 'edit' });
  }
}
