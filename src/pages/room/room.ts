import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,Content } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import * as firebase from 'firebase';
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
  

  private user;
  data = { type:'', name:'', message:'',roomname:'' };
  ref = firebase.database().ref('chatrooms/');
  chats = [];
  roomkey:any;
  nickname:string;
  offStatus:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    userService:UserServiceProvider) {
      this.user = userService.getCurrentUser();
      this.data.name = this.user.username;
      this.nickname = this.user.username;
      this.data.roomname = navParams.data.order._id;
      // let newData = this.ref.push();
      // newData.set({
      //   roomname:this.data.roomname
      // }); //定义房间名 并创建房间
      this.data.type = 'message';
      
      this.roomkey = navParams.data.roomkey;

    let joinData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
    joinData.set({
      type:'join',
      user:this.data.name,
      message:this.data.name+' has joined this room.',
      sendDate:Date()
    });
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
  

    exitChat(){

    }
    // exitChat() {
    //   let exitData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
    //   exitData.set({
    //     type:'exit',
    //     user:this.data.name,
    //     message:this.data.name+' has exited this room.',
    //     sendDate:Date()
    //   });
  
    //   this.offStatus = true;
  
    //   this.navCtrl.setRoot(RoomPage, {
    //     nickname:this.data.name
    //   });
    // }


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
