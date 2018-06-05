import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController, App } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { complain } from '../../models/complain';
import { ComplainServiceProvider } from '../../providers/complain-service/complain-service';
import * as firebase from 'firebase';
import { RoomPage } from '../room/room';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the ComplainInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-complain-information',
  templateUrl: 'complain-information.html',
})
export class ComplainInformationPage {
  //data = { type:'', name:'', message:'',roomname:'' };
  //ref = firebase.database().ref('chatrooms/');
  //roomkey:any;
  ref = firebase.database().ref('supportChatrooms/');
  complainForm: FormGroup;
  orderInformation;
  username;
  model = new complain('', '', '', 'Order', '', 0, null, '', null, '', '', '', '');
  roomkey;
  roomname;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userService: UserServiceProvider,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private complainService: ComplainServiceProvider,
    private toastCtrl: ToastController
  ) {
    this.username = this.userService.getCurrentUser().username;
    this.orderInformation = this.navParams.data;
    this.complainForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    })
  }

  submitForm() {
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'loading...',
      //duration: 3000,
      dismissOnPageChange: true
    });
    loading.present();
    this.model.username = this.username;
    this.model.orderId = this.orderInformation._id;
    this.model.crypto = this.orderInformation.crypto;
    this.model.theOther = this.orderInformation.seller == this.username ? this.orderInformation.buyer : this.username
    this.model.fiat = this.orderInformation.fiat;
    console.log(this.orderInformation.fiat)
    console.log(this.model);
    this.complainService.sendComplain(this.model).subscribe(result => {
      console.log(result)

      //console.log(result)
      this.navCtrl.pop()
      if (result == null) {
        loading.dismiss();
        this.toastCtrl
          .create({
            message: `This order has been complained.Please waitting support to solve`,
            duration: 4500
          })
          .present();
      } else {
        this.roomname = JSON.parse(JSON.stringify(result))._id;
        let newData = this.ref.push();
        newData.set({
          roomname: this.roomname
        }); //定义房间名 并创建房间
        this.roomkey = getRoomKey(this.ref);

        this.complainService.addRoomKey(this.roomkey, this.roomname).subscribe(() => {
          loading.dismiss();
          this.toastCtrl
            .create({
              message: `success`,
              duration: 4500
            })
            .present();
        });
      }
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ComplainInformationPage');
  }
}

export const getRoomKey = ref => {
  let roomkey;
  ref.limitToLast(1).on('child_added', function (prevChildKey) {
    //console.log("===>>>>" + prevChildKey.key)
    roomkey = prevChildKey.key;
  }); //获取roomkey
  return roomkey;
};
