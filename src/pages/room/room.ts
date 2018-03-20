import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,Content } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import * as firebase from 'firebase';
import { ComplainInformationPage } from '../complain-information/complain-information';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { ProfilePage } from '../profile/profile';
import { WalletPage } from '../wallet/wallet'
/**
 * Generated class for the RoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {
  @ViewChild(Content) content: Content;
  private orderInfo;
  private user;
  data = { type:'', name:'', message:'',roomname:'' };
  ref = firebase.database().ref('chatrooms/');
  chats = [];
  roomkey:any;
  nickname:string;
  offStatus:boolean = false;
  status;
  switched = false;
  trader;
  type;
  finished;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userService:UserServiceProvider,
    private orderServiceProvider: OrderServiceProvider) {
      this.user = userService.getCurrentUser();
      this.data.name = this.user.username;
      this.nickname = this.user.username;
      this.type = navParams.data.type;
      this.data.type = 'message';
      console.log(this.type)
      if(this.type == "order"){
        console.log("1111111111111")
        this.trader = navParams.data.trader;
        this.orderInfo = navParams.data.order; 
        this.finished = this.orderInfo.finished;
        this.data.roomname = navParams.data.order._id;
        if(navParams.data.order.roomkey == null){
          this.roomkey = navParams.data.roomkey;
        }else{
          this.roomkey = navParams.data.order.roomkey
        }
      }else{
        console.log("2222222222222")
        this.data.roomname = navParams.data.conplain;
        this.finished = true;
        if(navParams.data.complain.roomkey == null){
          this.roomkey = navParams.data.roomkey;
        }else{
          this.roomkey = navParams.data.complain.roomkey;
        }
      }
      
    this.data.message = '';

    firebase.database().ref('chatrooms/'+this.roomkey+'/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        if(this.offStatus === false) {
          //this.content.scrollToBottom(300);
        }
      }, 1000);
    });


    }

    sendMessage() {
      let newData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
      newData.set({
        type:this.data.type,
        user:this.data.name,
        message:this.data.message,
        sendDate:Date()
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
  let roomkey ;
  ref.limitToLast(1).on("child_added",function(prevChildKey){
    console.log("===>>>>" + prevChildKey.key) 
    roomkey = prevChildKey.key
  })//获取roomkey
  return roomkey;
};
