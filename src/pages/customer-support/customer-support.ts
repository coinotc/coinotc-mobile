import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  IonicPage, NavController, NavParams, ModalController, LoadingController, Content,
  Events,
} from 'ionic-angular';
import { ComplainServiceProvider } from '../../providers/complain-service/complain-service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
/**
 * Generated class for the CustomerSupportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-support',
  templateUrl: 'customer-support.html',
})
export class CustomerSupportPage {
  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  data = { type: '', name: '', message: '', roomname: '' };
  chats = [];
  message = { content: '', date: null, role: '' };
  complain;
  complainChat;
  leaveMess = '';
  complainStatus;
  chatsObservable$: any;
  roomkey: any;
  offStatus: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public complainService: ComplainServiceProvider,
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController, ) {
    this.complain = this.navParams.data.complain;
    this.roomkey = this.complain.roomkey;
    this.complainStatus = this.complain.status;
    this.data.roomname = this.complain._id;
    this.data.type = "message";
    console.log(this.complainStatus)
    //this.chatsObservable$ = Observable.of(this.complain.message);
    console.log(this.complain.message)
    this.data.message = '';
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'loading...',
      dismissOnPageChange: true
      //duration: 3500
    });
    loading.present();
    var start = new Date().getTime();
    firebase
      .database()
      .ref('supportChatrooms/' + this.roomkey + '/chats')
      //.limitToLast(10)
      .on('value', resp => {
        this.chats = [];
        this.chats = snapshotToArray(resp);
        console.log(this.chats);
        this.chatsObservable$ = Observable.of(this.chats);
        setTimeout(() => {
          if (this.offStatus === false) {
            this.content.scrollToBottom(300);
            if (this.content._scroll) this.content.scrollToBottom(300);
            loading.dismiss();
          }
        }, 1000);
        //loading.dismiss();
        var end = new Date().getTime();
        console.log(end - start);
        
      });
  }
  // onPost() {
  //   this.message.content = this.leaveMess;
  //   this.message.date = new Date();
  //   this.message.role = 'user';
  //   this.complain.message.unshift(this.message);
  //   console.log(this.complain.message)
  //   this.complainService
  //     .patchnewMessage(this.complain._id, this.complain.message)
  //     .subscribe(result => {
  //       this.complain = result
  //       this.leaveMess = '';
  //     });
  // }
  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 1000);
  }
  doRefresh(refresher?) {
    var start = new Date().getTime();
    //this.itemPerPage = this.itemPerPage + 10;
    firebase
      .database()
      .ref('supportChatrooms/' + this.roomkey + '/chats')
      //.limitToLast(this.itemPerPage)
      .on('value', resp => {
        console.log(this.chats)
        this.chats = [];
        this.chats = snapshotToArray(resp);
        console.log(this.chats)
        this.chatsObservable$ = Observable.of(this.chats);
        setTimeout(() => {
          if (this.offStatus === false) {
            //if (this.content._scroll) this.content.scrollToTop(300);
            // this.content.scrollToBottom();
            if (refresher) {
              refresher.complete();
            }
          }
        }, 1000);
        var end = new Date().getTime();
        console.log(end - start);
      });
  }
  changeStatus() {
    this.complainService.changeStatus(this.complain._id, 3).subscribe(result => {
      //this.listToComplainChatService.complainResult.subscribe(complain => this.complain = complain);
      //this.navCtrl.pop()
      this.complain = result;
      console.log(result)
      this.complainStatus = result.status;
    });
  }
  sendMessage() {
    //this.data.message = this.leaveMess;
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'loading...',
      dismissOnPageChange: true
      //duration: 3500
    });
    loading.present();
    if (this.data.message.trim() != '') {
      let newData = firebase
        .database()
        .ref('supportChatrooms/' + this.roomkey + '/chats')
        .push()
      newData.set({
        type: this.data.type,
        user: "user",
        message: this.data.message,
        sendDate: Date()
      }).then((() => {
        loading.dismiss();
      })
      )
      this.data.message = '';
      loading.dismiss();
      //this.scrollToBottom();
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerSupportPage');
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