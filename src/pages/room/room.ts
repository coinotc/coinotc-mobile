import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Content,
  Events,
  Platform,
  LoadingController,
  ModalController,
  ViewController
} from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import * as firebase from 'firebase';
import { ComplainInformationPage } from '../complain-information/complain-information';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { ProfilePage } from '../profile/profile';
import { WalletPage } from '../wallet/wallet';
import { Notification } from '../../models/notification';
import { ProfileServiceProvider } from '../../providers/profile-service/profile-service';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
import { OrderListPage } from '../order-list/order-list';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { ImageViewerController } from 'ionic-img-viewer';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { Storage } from '@ionic/storage';
import { CryptowalletProvider } from '../../providers/cryptowallet/cryptowallet';
/**
 * Generated class for the RoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  template: `
  <ion-header>
  <ion-toolbar mode="ios">
    <ion-title mode="ios">
      {{'Description' | translate}}
    </ion-title>
    <ion-buttons start mode="ios">
      <button ion-button (tap)="dismiss()">
        <span ion-text color="primary">{{'Cancel' | translate}}</span>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content *ngIf="orderInfo">

  <ion-list>

    <ion-item>
      <span text-capitalize>{{orderInfo.crypto | lowercase}}</span>
      <span style="float:right">{{("orderStatus." + orderInfo.finished)| translate}}</span>
    </ion-item>

    <ion-item>
      {{'OrderID' | translate}}:
      <span style="float:right">{{orderInfo._id}}</span>
    </ion-item>
    <ion-item>
      {{'Amount' | translate}}
      <span style="float:right">{{orderInfo.fiat}} {{orderInfo.amount}}</span>
    </ion-item>
    <ion-item>{{'Quantity' | translate}}
      <span style="float:right">{{orderInfo.quantity}} {{orderInfo.crypto}}</span>
    </ion-item>
    <ion-item>{{'Price' | translate}}
      <span style="float:right">{{orderInfo.price | number : '1.2-2'}} {{orderInfo.fiat}}/{{orderInfo.crypto}}</span>
    </ion-item>
    <ion-item *ngIf="orderInfo.owner == user.username">{{'Fee' | translate}}
      <span style="float:right">{{0.07 * orderInfo.quantity}} {{orderInfo.crypto}}</span>
    </ion-item>
    <ion-item>{{'Buyer' | translate}}:{{orderInfo.buyer}}
      <span style="float:right">{{'Seller' | translate}}:{{orderInfo.seller}}</span>
    </ion-item>
    <ion-item>{{'Message' | translate}}:
      <span style="float:right">{{orderInfo.message}}</span>
    </ion-item>
    <ion-item>
      <div align=center>
        <div *ngIf="orderInfo.finished == 1 || orderInfo.finished ==2">
          <button ion-button large round full *ngIf="user.username == orderInfo.seller" [disabled]="orderInfo.finished !== 2" (tap)="onFinished()">{{'Approve' | translate}}</button>
          <button ion-button large round full *ngIf="user.username == orderInfo.buyer"  [disabled]="orderInfo.finished !== 1" (tap)="onInformed()">{{'Inform' | translate}}</button>
        </div>
        <div *ngIf="orderInfo.finished == 3 && (this.user.username == this.orderInfo.buyer && this.orderInfo.buyerRating == null || this.user.username == this.orderInfo.seller && this.orderInfo.sellerRating == null)">
          <rating [(ngModel)]="rate" readOnly="false" max="5" emptyStarIconName="star-outline" halfStarIconName="star-half" starIconName="star"
            nullable="false">
          </rating>
          <button ion-button large round full (tap)="onRating()">{{'ConfirmRating' | translate}}</button>
        </div>
      </div>
    </ion-item>

  </ion-list>

  <div align=center>
    <button ion-button round (tap)="onProfile(trader)">{{'Trader' | translate}}</button>
    <button ion-button round (tap)="onWallet()">{{'Wallet' | translate}}</button>
  </div>

</ion-content>
  `
})
export class ModalContentPage {
  private timerSubscription: AnonymousSubscription;
  orderInfo;
  trader;
  user;
  rateStatus;
  notification = new Notification('', null, null, 'high');
  average;
  rate;
  data = { type: '', name: '', message: '', roomname: '' };
  roomkey;
  offStatus: boolean = false;
  chats = [];
  constructor(
    public userService: UserServiceProvider,
    private orderServiceProvider: OrderServiceProvider,
    private profileServiceProvider: ProfileServiceProvider,
    private alertServiceProvider: AlertServiceProvider,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private events: Events,
    private storage: Storage,
    private wallet: CryptowalletProvider
  ) {
    this.roomkey = this.params.data.roomkey
    this.orderInfo = this.params.data.orderInfo;
    this.trader = this.params.data.trader;
    this.user = userService.getCurrentUser();
    this.profileServiceProvider.getProfile(this.trader).subscribe(result => {
      console.log('>>>>>>>>>>>' + this.trader);
      console.log(result);
      this.notification.to = result[0].deviceToken;
      this.notification.notification = {
        body: `Your Order with ${this.user.username} has progress !`,
        icon: 'fcm_push_icon',
        sound: 'default',
        click_action: 'FCM_PLUGIN_ACTIVITY'
      };
      this.notification.data = {
        type: `${this.trader}OrderChanged`,
        order: this.orderInfo._id
      };
    });
    console.log(JSON.stringify(this.orderInfo));
  }

  onRefresh() {
    this.orderServiceProvider
      .getSpecificOrder(this.orderInfo._id)
      .subscribe(result => {
        this.orderInfo = result;
        if (
          this.user.username == this.orderInfo.buyer &&
          this.orderInfo.buyerRating == null
        ) {
          this.rateStatus = false;
        } else if (
          this.user.username == this.orderInfo.seller &&
          this.orderInfo.sellerRating == null
        ) {
          this.rateStatus = false;
        }
        if (this.orderInfo.finished == 1 || this.orderInfo.finished == 2) {
          this.subscribeToData();
        }
      });
  }

  private subscribeToData(): void {
    this.timerSubscription = Observable.timer(3000).subscribe(() =>
      this.onRefresh()
    );
  }

  onInformed() {
    this.orderInfo.finished = 2;
    this.orderServiceProvider.updateOrder(this.orderInfo).subscribe(result => {
      let InformeData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
      InformeData.set({
        type: 'informed',
        user: this.user.username,
        message: this.user.username + ' has made a fiat payment.',
        sendDate: Date()
      });
      this.data.message = '';

      firebase.database().ref('chatrooms/' + this.roomkey + '/chats').on('value', resp => {
        this.chats = [];
        this.chats = snapshotToArray(resp);
        setTimeout(() => {
          if (this.offStatus === false) {
            //this.content.scrollToBottom(300);
          }
        }, 1000);
      });
      //Send push notification to trader
      console.log(this.notification);
      this.alertServiceProvider
        .onNotification(this.notification)
        .subscribe(result => {
          console.log(JSON.stringify(result));
        });
      this.orderServiceProvider
        .getSpecificOrder(this.orderInfo._id)
        .subscribe(result => {
          this.orderInfo = result;
        });
      this.decreaseCount();
    });
    
  }

  onFinished() {
    this.orderInfo.finished = 3;
    this.orderServiceProvider.updateOrder(this.orderInfo).subscribe(result => {
      this.orderServiceProvider
        .getSpecificOrder(this.orderInfo._id)
        .subscribe(result => {
          this.orderInfo = result;
        });
      this.decreaseCount();
    });
    //Send push notification to trader
    this.alertServiceProvider
      .onNotification(this.notification)
      .subscribe(result => {
        console.log(result);
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
              let triggerAlert = new Notification('', null, null, 'high');
              this.profileServiceProvider
                .getProfile(result[i].username)
                .subscribe(result => {
                  triggerAlert.to = result[0].deviceToken;
                  triggerAlert.notification = {
                    body: `You may be willing to SELL ${
                      this.orderInfo.crypto
                      } in ${this.orderInfo.fiat} now !`,
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
              result[i].status = false;
              this.alertServiceProvider
                .updateAlert(result[i])
                .subscribe(result => {
                  console.log(result);
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
            for (let i = 0; i < result.length; i++) {
              let triggerAlert = new Notification('', null, null, 'high');
              this.profileServiceProvider
                .getProfile(result[i].username)
                .subscribe(result => {
                  triggerAlert.to = result[0].deviceToken;
                  triggerAlert.notification = {
                    body: `You may be willing to BUY ${
                      this.orderInfo.crypto
                      } in ${this.orderInfo.fiat} now !`,
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
              result[i].status = false;
              this.alertServiceProvider
                .updateAlert(result[i])
                .subscribe(result => {
                  console.log(result);
                });
            }
          });
      });
    let FinishData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    FinishData.set({
      type: 'finish',
      user: this.user.username,
      message: this.user.username + ' has released the coins to your wallet.',
      sendDate: Date()
    });
    this.data.message = '';

    firebase.database().ref('chatrooms/' + this.roomkey + '/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        if (this.offStatus === false) {
          //this.content.scrollToBottom(300);
        }
      }, 1000);
    });
  }

  onRating() {
    this.orderServiceProvider
      .getSpecificOrder(this.orderInfo._id)
      .subscribe(result => {
        this.orderInfo = result;
        if (this.user.username == this.orderInfo.buyer) {
          this.orderInfo.buyerRating = this.rate;
          if (this.orderInfo.sellerRating !== null) {
            this.orderInfo.finished = 0;
          }
        } else if (this.user.username == this.orderInfo.seller) {
          this.orderInfo.sellerRating = this.rate;
          if (this.orderInfo.buyerRating !== null) {
            this.orderInfo.finished = 0;
          }
        }
        this.orderServiceProvider
          .updateOrder(this.orderInfo)
          .subscribe(result => {
            this.events.publish('reloadList');
            this.navCtrl.pop();
          });
      });
    this.profileServiceProvider.getProfile(this.trader).subscribe(result => {
      let ratings = result[0].ratings;
      ratings.push(this.rate);
      this.profileServiceProvider.sendRating(this.trader, ratings).subscribe();
    });
    let RatingData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    RatingData.set({
      type: 'rating',
      user: this.user.username,
      message: this.user.username + ' has rated you.',
      sendDate: Date()
    });
    this.data.message = '';

    firebase.database().ref('chatrooms/' + this.roomkey + '/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        if (this.offStatus === false) {
          //this.content.scrollToBottom(300);
        }
      }, 1000);
    });
  }

  decreaseCount() {
    let filtered = [];
    this.storage
      .ready()
      .then(() => this.storage.get(`${this.user.username}OrderChanged`))
      .then(value => {
        if (value != null) {
          filtered = value.filter(
            function (e) {
              return this.indexOf(e) < 0;
            },
            [this.orderInfo._id]
          );
          console.log('filteredIs' + filtered);
        } else {
          filtered = [];
        }
      })
      .then(() =>
        this.storage.set(`${this.user.username}OrderChanged`, filtered)
      )
      .then(() => this.events.publish('orderBadge:updated', filtered));
  }

  onWallet() {
    this.navCtrl.push(WalletPage);
  }

  ionViewDidEnter() {
    this.onRefresh();
  }

  ionViewDidLeave() {
    this.events.unsubscribe('reloadList');
  }

  onProfile(trader) {
    console.log(trader);
    this.navCtrl.push(ProfilePage, trader);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html'
})
export class RoomPage {
  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  private orderInfo;
  private user;
  data = { type: '', name: '', message: '', roomname: '' };
  ref = firebase.database().ref('chatrooms/');
  input;
  chats = [];
  roomkey: any;
  nickname: string;
  offStatus: boolean = false;
  switched = false;
  trader;
  average;
  type;
  finished;
  base64Image: string;
  rate;
  rateStatus;
  itemPerPage: number = 20;
  chatsObservable$: any;
  private _imageViewerCtrl: ImageViewerController;

  constructor(
    public navParams: NavParams,
    private userService: UserServiceProvider,
    private orderServiceProvider: OrderServiceProvider,
    private profileServiceProvider: ProfileServiceProvider,
    private alertServiceProvider: AlertServiceProvider,
    public navCtrl: NavController,
    private events: Events,
    public camera: Camera,
    public platform: Platform,
    private storage: AngularFireStorage,
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private imageViewerCtrl: ImageViewerController
  ) {
    //convert data
    if (typeof navParams.data == 'string') {
      this.input = JSON.parse(navParams.data);
    } else {
      this.input = navParams.data;
    }
    this.events.unsubscribe('reloadtrade');
    this._imageViewerCtrl = imageViewerCtrl;
    this.user = userService.getCurrentUser();
    this.data.name = this.user.username;
    this.nickname = this.user.username;
    this.type = this.input.type;
    this.data.type = 'message';
    this.trader = this.input.trader;
    this.orderInfo = this.input.order;
    this.finished = this.orderInfo.finished;
    this.data.roomname = this.input.order._id;
    if (this.input.roomkey == null) {
      this.roomkey = this.input.order.roomkey;
    } else {
      this.roomkey = this.input.roomkey;
    }
    this.data.message = '';
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'loading...',
      dismissOnPageChange: true,
      //duration: 3000
    });
    loading.present();
    var start = new Date().getTime();
    firebase
      .database()
      .ref('chatrooms/' + this.roomkey + '/chats')
      //.limitToLast(10)
      .on('value', resp => {
        this.chats = [];
        this.chats = snapshotToArray(resp);
        this.chatsObservable$ = Observable.of(this.chats);
        console.log(">>>>>>")
        loading.dismiss();
        console.log("<<<<<<<<")
        var end = new Date().getTime();
        console.log(end - start);
        setTimeout(() => {
          if (this.offStatus === false) {
            // this.content.scrollToBottom(300);
            if (this.content._scroll) this.content.scrollToBottom(300);
            console.log("timeout-------")
          }
        }, 1000);
      })
      // loading.dismiss();
  }

  doRefresh(refresher?) {
    var start = new Date().getTime();
    this.itemPerPage = this.itemPerPage + 10;
    firebase
      .database()
      .ref('chatrooms/' + this.roomkey + '/chats')
      //.limitToLast(this.itemPerPage)
      .on('value', resp => {
        this.chats = [];
        this.chats = snapshotToArray(resp);

        setTimeout(() => {
          if (this.offStatus === false) {
            // if (this.content._scroll) this.content.scrollToTop(300);
            if (refresher) {
              refresher.complete();
            }
          }
        }, 1000);
        var end = new Date().getTime();
        console.log(end - start);
      });
  }

  sendMessage() {
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Loading...',
      dismissOnPageChange: true
      //duration: 3500
    });
    loading.present();
    if (this.data.message.trim() != '') {
      let newData = firebase
        .database()
        .ref('chatrooms/' + this.roomkey + '/chats')
        .push()
      newData.set({
        type: this.data.type,
        user: this.data.name,
        message: this.data.message,
        sendDate: Date()
      }).then((() => {
        loading.dismiss();
      })
      )
      setTimeout(() => {
          // this.content.scrollToBottom(300);
          if (this.content._scroll) this.content.scrollToBottom(300);
          console.log("timeout-------")
        
      }, 1000);
      this.data.message = '';
      //loading.dismiss();
      //this.scrollToBottom();
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 1000);
  }

  complain() {
    console.log(this.orderInfo);
    this.navCtrl.push(ComplainInformationPage, this.orderInfo);
  }

  attachImage() {
    console.log('attached image ....');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    if (this.platform.is('cordova')) {
      this.camera.getPicture(options).then(
        imageData => {
          let loading = this.loadingCtrl.create({
            spinner: 'circles',
            content: 'Uploading...',
            duration: 3500
          });
          loading.present();
          // imageData is either a base64 encoded string or a file URI
          // If it's base64:
          const filename = Math.floor(Date.now() / 1000);
          const filenameStr = `chat/${this.roomkey}_${filename}.jpeg`;
          console.log(filenameStr);
          this.base64Image = 'data:image/jpeg;base64,' + imageData;
          this.storage
            .ref(filenameStr)
            .putString(this.base64Image, 'data_url')
            .then(snapshot => {
              console.log('SNAPSHOT ---> ');
              //loading.dismiss().then(() => {
              let newData = firebase
                .database()
                .ref('chatrooms/' + this.roomkey + '/chats')
                .push();
              newData
                .set({
                  type: this.data.type,
                  user: this.data.name,
                  message: null,
                  isImage: true,
                  //base64Image: this.base64Image,
                  sendDate: Date(),
                  downloadURL: snapshot.downloadURL
                }).then(() => {
                  setTimeout(() => {
                    // this.content.scrollToBottom(300);
                    if (this.content._scroll) this.content.scrollToBottom(300);
                    console.log("timeout-------");
                    loading.dismiss();
                  
                }, 1000);
                 
                })
                .catch(e => {
                  console.log(e);
                  loading.dismiss();
                })
              //});
              //loading.dismiss();
            });
        },
        err => {
          //loading.dismiss();
          console.log('Error taking photo', JSON.stringify(err));
        }
      );
    }
  }

  viewAttachedImage(chatImage) {
    // we need to store to the fire storage then keep the url.
    console.log('Preview image > ' + chatImage);
    const imageViewer = this._imageViewerCtrl.create(chatImage);
    imageViewer.present();
  }

  takePhoto() {
    console.log('take photo ....');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    if (this.platform.is('cordova')) {
      this.camera.getPicture(options).then(
        imageData => {
          let loading = this.loadingCtrl.create({
            spinner: 'circles',
            content: 'Uploading...',
            //duration: 3500
          });
          loading.present();
          // imageData is either a base64 encoded string or a file URI
          // If it's base64:
          const filename = Math.floor(Date.now() / 1000);
          const filenameStr = `chat/${this.roomkey}_${filename}.jpeg`;
          this.base64Image = 'data:image/jpeg;base64,' + imageData;
          this.storage
            .ref(filenameStr)
            .putString(this.base64Image, 'data_url')
            .then(snapshot => {
              console.log('SNAPSHOT ' + snapshot);
              //loading.dismiss().then(() => {
              let newData = firebase
                .database()
                .ref('chatrooms/' + this.roomkey + '/chats')
                .push();
              loading.dismiss()
              newData.set({
                type: this.data.type,
                user: this.data.name,
                message: null,
                isImage: true,
                //base64Image: this.base64Image,
                sendDate: Date(),
                downloadURL: snapshot.downloadURL
              });
              //});
            })
            .catch(e => console.log(e));
        },
        err => {
          console.log('Error taking photo', JSON.stringify(err));
        }
      );
    }
  }

  onFocus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  ionViewDidLeave() {
    this.events.unsubscribe('reloadList');
  }

  openModal() {
    let modal = this.modalCtrl.create(ModalContentPage, {
      orderInfo: this.input.order,
      trader: this.input.trader,
      type: 'order',
      roomkey: this.roomkey
    });
    modal.present();
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
  ref.limitToLast(1).on('child_added', function (prevChildKey) {
    console.log('===>>>>' + prevChildKey.key);
    roomkey = prevChildKey.key;
  }); //获取roomkey
  return roomkey;
};
