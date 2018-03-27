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
  average;
  notification = new Notification('', null);
  type;
  finished;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserServiceProvider,
    private orderServiceProvider: OrderServiceProvider,
    private profileServiceProvider: ProfileServiceProvider,
    private alertServiceProvider: AlertServiceProvider
  ) {
    this.user = userService.getCurrentUser();
    this.data.name = this.user.username;
    this.nickname = this.user.username;
    this.type = navParams.data.type;
    this.data.type = 'message';
    if (this.type == 'order') {
      this.trader = navParams.data.trader;
      this.orderInfo = navParams.data.order;
      this.finished = this.orderInfo.finished;
      this.data.roomname = navParams.data.order._id;
      this.profileServiceProvider.getProfile(this.trader).subscribe(result => {
        this.notification.to = result[0].deviceToken;
        this.notification.notification = {
          title: `Your Order with ${this.trader} has progress !`,
          body: `Order ID : ${this.orderInfo._id}`,
          icon: 'fcm_push_icon',
          sound: 'default',
          click_action: 'FCM_PLUGIN_ACTIVITY'
        };
      });
      if (navParams.data.roomkey == null) {
        this.roomkey = navParams.data.order.roomkey;
      } else {
        this.roomkey = navParams.data.roomkey;
      }
    } else {
      this.data.roomname = navParams.data.conplain;
      this.finished = true;
      if (navParams.data.complain.roomkey == null) {
        this.roomkey = navParams.data.complain.roomkey;
      } else {
        this.roomkey = navParams.data.roomkey;
      }
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
    this.orderServiceProvider
      .getSpecificOrder(this.orderInfo._id)
      .subscribe(result => {
        this.orderInfo = result;
        if (this.orderInfo.finished == false) {
          if (
            this.user.username == this.orderInfo.seller &&
            this.orderInfo.informed == true
          ) {
            this.status = 0;
          } else if (
            this.user.username == this.orderInfo.buyer &&
            this.orderInfo.informed == false
          ) {
            this.status = 1;
          }
        }
      });
    this.switched = !this.switched;
  }

  onInformed() {
    this.status = 2;
    this.orderInfo.informed = true;
    this.orderServiceProvider.updateOrder(this.orderInfo).subscribe();
    //Send push notification to trader
    this.alertServiceProvider
      .onNotification(this.notification)
      .subscribe(result => {
        console.log(JSON.stringify(result));
      });
  }

  onFinished() {
    this.status = 2;
    this.orderInfo.finished = true;
    this.orderServiceProvider.updateOrder(this.orderInfo).subscribe();
    //Send push notification to trader
    this.alertServiceProvider
      .onNotification(this.notification)
      .subscribe(result => {
        console.log(JSON.stringify(result));
      });
    //Send push notification to above alerts
    this.orderServiceProvider
      .getAlertInformation(this.orderInfo.fiat, this.orderInfo.crypto)
      .subscribe(result => {
        this.average = result;
        this.alertServiceProvider
          .getAbove(
            true,
            true,
            this.orderInfo.fiat,
            this.orderInfo.crypto,
            this.average
          )
          .subscribe(result => {
            console.log(result);
            for (let i = 0; i < result.length; i++) {
              let triggerAlert = new Notification('', null);
              this.profileServiceProvider
                .getProfile(result[i].username)
                .subscribe(result => {
                  triggerAlert.to = result[0].deviceToken;
                  triggerAlert.notification = {
                    title: `You may be willing to SELL ${
                      this.orderInfo.crypto
                    } in ${this.orderInfo.fiat} now !`,
                    body: `The average price from recent trades is ${
                      this.average
                    } ${this.orderInfo.fiat}`,
                    sound: 'default',
                    click_action: 'FCM_PLUGIN_ACTIVITY',
                    icon: 'fcm_push_icon'
                  };
                  console.log(triggerAlert);
                  this.alertServiceProvider
                    .onNotification(triggerAlert)
                    .subscribe(result => {
                      console.log(result);
                    });
                });
            }
          });
      });
    //Send push notification to below alerts
    this.orderServiceProvider
      .getAlertInformation(this.orderInfo.fiat, this.orderInfo.crypto)
      .subscribe(result => {
        this.average = result;
        this.alertServiceProvider
          .getBelow(
            false,
            true,
            this.orderInfo.fiat,
            this.orderInfo.crypto,
            this.average
          )
          .subscribe(result => {
            console.log(result);
            for (let i = 0; i < result.length; i++) {
              let triggerAlert = new Notification('', null);
              this.profileServiceProvider
                .getProfile(result[i].username)
                .subscribe(result => {
                  triggerAlert.to = result[0].deviceToken;
                  triggerAlert.notification = {
                    title: `You may be willing to BUY ${
                      this.orderInfo.crypto
                    } in ${this.orderInfo.fiat} now !`,
                    body: `The average price from recent trades is ${
                      this.average
                    } ${this.orderInfo.fiat}`,
                    sound: 'default',
                    click_action: 'FCM_PLUGIN_ACTIVITY',
                    icon: 'fcm_push_icon'
                  };
                  console.log(triggerAlert);
                  this.alertServiceProvider
                    .onNotification(triggerAlert)
                    .subscribe(result => {
                      console.log(result);
                    });
                });
            }
          });
      });
  }

  onComment() {
    this.status = 3;
    this.user.orderCount = this.user.orderCount + 1;
    this.userService.update(this.user).subscribe();
    this.profileServiceProvider.getProfile(this.trader).subscribe(result => {
      let goodCount = result[0].goodCount;
      goodCount++;
      this.profileServiceProvider
        .sendComment(this.trader, goodCount)
        .subscribe();
    });
    this.navCtrl.pop();
  }

  onProfile(trader) {
    this.navCtrl.push(ProfilePage, trader);
  }

  onWallet() {
    this.navCtrl.push(WalletPage);
  }

  onExit() {
    this.user.orderCount = this.user.orderCount + 1;
    this.userService.update(this.user).subscribe();
    this.navCtrl.pop();
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
