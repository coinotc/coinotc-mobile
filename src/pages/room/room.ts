import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import * as firebase from 'firebase';
import { ComplainInformationPage } from '../complain-information/complain-information';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { ProfilePage } from '../profile/profile';
import { WalletPage } from '../wallet/wallet';
import { Notification } from '../../models/notification';
import { ProfileServiceProvider } from '../../providers/profile-service/profile-service';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
/**
 * Generated class for the RoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html'
})
export class RoomPage {
  @ViewChild(Content) content: Content;
  private orderInfo;
  private user;
  data = { type: '', name: '', message: '', roomname: '' };
  ref = firebase.database().ref('chatrooms/');
  chats = [];
  roomkey: any;
  nickname: string;
  offStatus: boolean = false;
  status;
  switched = false;
  trader;
  notification = new Notification('', null);

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserServiceProvider,
    private orderServiceProvider: OrderServiceProvider,
    private profileServiceProvider: ProfileServiceProvider,
    private alertServiceProvider: AlertServiceProvider
  ) {
    this.user = userService.getCurrentUser();
    this.trader = navParams.data.trader;
    this.data.name = this.user.username;
    this.nickname = this.user.username;
    this.data.roomname = navParams.data.order._id;
    this.orderInfo = navParams.data.order;
    this.data.type = 'message';
    if (navParams.data.order.roomkey == null) {
      this.roomkey = navParams.data.roomkey;
    } else {
      this.roomkey = navParams.data.order.roomkey;
    }
    this.data.message = '';
    firebase
      .database()
      .ref('chatrooms/' + this.roomkey + '/chats')
      .on('value', resp => {
        this.chats = [];
        this.chats = snapshotToArray(resp);
        setTimeout(() => {
          if (this.offStatus === false) {
            //this.content.scrollToBottom(300);
          }
        }, 1000);
      });
    this.profileServiceProvider.getProfile(this.trader).subscribe(result => {
      this.notification.to = result[0].deviceToken;
      this.notification.notification = {
        title: `Your Order with ${this.trader} is done`,
        body: `Order ID ${this.orderInfo._id} is done`,
        icon: 'fcm_push_icon',
        sound: 'default',
        click_action: 'FCM_PLUGIN_ACTIVITY'
      };
      console.log(this.notification);
    });
  }

  sendMessage() {
    let newData = firebase
      .database()
      .ref('chatrooms/' + this.roomkey + '/chats')
      .push();
    newData.set({
      type: this.data.type,
      user: this.data.name,
      message: this.data.message,
      sendDate: Date()
    });
    this.data.message = '';
  }

  complain() {
    this.navCtrl.push(ComplainInformationPage, this.orderInfo);
  }

  onSwitch() {
    if (this.user.username == this.orderInfo.seller) {
      this.status = 0;
    } else if (this.user.username == this.orderInfo.buyer) {
      this.status = 1;
    }
    this.switched = !this.switched;
  }

  onFinished() {
    this.status = 2;
    this.orderInfo.finished = true;
    this.user.orderCount = this.user.orderCount + 1;
    this.userService.update(this.user).subscribe();
    this.orderServiceProvider.updateOrder(this.orderInfo).subscribe();
    this.alertServiceProvider
      .onNotification(this.notification)
      .subscribe(result => {
        console.log(JSON.stringify(result));
      });
  }

  onComment() {
    this.status = 3;
    this.user.goodCount = this.user.goodCount + 1;
    this.userService.update(this.user).subscribe();
    this.navCtrl.pop();
  }

  onProfile(trader) {
    this.navCtrl.push(ProfilePage, trader);
  }

  onWallet() {
    this.navCtrl.push(WalletPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }
}

export const snapshotToArray = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
export const getRoomKey = ref => {
  let roomkey;
  ref.limitToLast(1).on('child_added', function(prevChildKey) {
    console.log('===>>>>' + prevChildKey.key);
    roomkey = prevChildKey.key;
  }); //获取roomkey
  return roomkey;
};
