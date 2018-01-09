import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { OrderInformation } from './orderInformation';
import * as firebase from 'firebase';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { WalletPage } from '../wallet/wallet';

/**
 * Generated class for the OrderWindowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-window',
  templateUrl: 'order-window.html',
})
export class OrderWindowPage {

  private orders: Observable<OrderInformation[]>;
  private user;
  status = 0;
  switched = false;
  orderInfo;
  client: any;
  ref;
  typingStatus;
  name;
  newmessage;
  messagesList;
  typing = '';
  typeStatusId;

  constructor(public navCtrl: NavController, public navParams: NavParams, private orderServiceProvider: OrderServiceProvider, public alert: AlertController, private userServiceProvider: UserServiceProvider) {
    this.orders = this.orderServiceProvider.getOrders(null);
    this.user = this.userServiceProvider.getCurrentUser();
    this.orderInfo = navParams.data;
    this.ref = firebase.database().ref('messages');
    this.typingStatus = firebase.database().ref('typeStatus');
    this.name = this.user.username;
    console.log(this.orderInfo)
  }

  onChange(e) {
    this.newmessage = e.target.value;
    //this.events.publish('chat:typing', this.name);
    this.typingStatus.push({
      name: this.name,
      datetime: Date.now()
    });
  }

  send() {
    // add new data to firebase
    this.ref.push({
      name: this.name,
      message: this.newmessage,
      datetime: Date.now()
    });
    this.newmessage = '';
  }

  onSwitch() {
    this.switched = !this.switched;
  }

  onFinished() {
    this.status = 1;
    this.orderInfo.finished = true;
    this.user.orderCount = this.user.orderCount + 1;
    this.userServiceProvider.update(this.user).subscribe();
    this.orderServiceProvider.updateOrder(this.orderInfo).subscribe();
  }

  onComment() {
    this.status = 2;
    this.user.goodCount = this.user.goodCount + 1;
    this.userServiceProvider.update(this.user).subscribe();
    this.navCtrl.pop();
  }

  onExit() {
    this.navCtrl.pop();
  }

  onWallet() {
    this.navCtrl.push(WalletPage);
  }

  ionViewDidLoad() {
    // Presenting popup
    // this.alert.create({
    //   title: 'Username',
    //   inputs: [{
    //     name: 'username',
    //     placeholder: 'username'
    //   }],
    //   buttons: [{
    //     text: 'Continue',
    //     handler: username => {
    //       this.name = username;
    //       // need to check list of logout users remove them as well. 
    //       this.typingStatus.on('value', data => {
    //         data.forEach(data => {
    //           console.log(data.val().id !== this.typeStatusId);
    //           if (typeof (data.val().name) !== 'undefined') {
    //             if (data.val().name === username) {
    //               data.remove();
    //             }
    //           }
    //         });
    //       });
    //     }
    //   }]
    // }).present();

    //reading data from firebase
    this.ref.on('value', data => {
      let tmp = [];
      data.forEach(data => {
        tmp.push({
          key: data.key,
          name: data.val().name,
          message: data.val().message
        })
      });
      this.messagesList = tmp;
    });
  }

  ngOnInit() {
    // Handle is typing event
    this.typingStatus.on('value', data => {
      data.forEach(data => {
        if (typeof (data.val().name) !== 'undefined') {
          if (data.val().name !== this.name.username) {
            this.typing = data.val().name + ' is typing...'
            setTimeout(() => {
              this.typing = ''
            }, 2000)
          }
        }
      });
    });

  }


}
