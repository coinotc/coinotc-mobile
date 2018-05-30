import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  ToastController,
  NavParams,
  LoadingController,
  Events
} from 'ionic-angular';
import { advertisement } from '../../models/advertisement';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { OrderInformation } from '../../models/orderInformation';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import * as firebase from 'firebase';
import { RoomPage } from '../room/room';
import { ProfilePage } from '../profile/profile';
import { ProfileServiceProvider } from '../../providers/profile-service/profile-service';
import { AdvertisementServiceProvider } from '../../providers/advertisement-service/advertisement-service';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { Notification } from '../../models/notification';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';

/**
 * Generated class for the ViewMyAdvertisementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-my-advertisement',
  templateUrl: 'view-my-advertisement.html',
})
export class ViewMyAdvertisementPage {
  information;
  title: string;
  user = { orderCount: null, rating: 0 };
  range;
  loading;
  orderinformation = new OrderInformation(
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    1,
    null
  );
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private toastCtrl: ToastController,
    public userservice: UserServiceProvider,
    public loadingCtrl: LoadingController,
    public orderservice: OrderServiceProvider,
    public profileservice: ProfileServiceProvider,
    public adservice: AdvertisementServiceProvider,
    private alertService: AlertServiceProvider) {

    //this.tradetype = navParams.data.tradetype;
    this.information = navParams.data.information;
    console.log(navParams.data);
    this.orderservice.getMyTrade(this.navParams.data.information.owner).subscribe(result => {
      this.user.orderCount = result;
    })
    this.profileservice.getProfile(this.navParams.data.information.owner).subscribe(result => {
      if (!(result[0].ratings.length == 0)) {
        this.user.rating = 0
        for (let _i: number = 0; _i < result[0].ratings.length; _i++) {
          console.log(result[0])
          let num = result[0].ratings[_i]
          console.log(num);
          this.user.rating = this.user.rating + num;
        }
        this.user.rating = this.user.rating / result[0].ratings.length;
      }
      console.log(this.user);
    });
    this.orderinformation.price = this.information.price;
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 5000
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewMyAdvertisementPage');
  }

}
