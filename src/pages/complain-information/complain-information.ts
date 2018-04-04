import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { complain } from '../../models/complain';
import { ComplainServiceProvider } from '../../providers/complain-service/complain-service';
import * as firebase from 'firebase';
import { RoomPage } from '../room/room';
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
  data = { type:'', name:'', message:'',roomname:'' };
  ref = firebase.database().ref('chatrooms/');
  roomkey:any;
  orderInformation;
  compainUser;
  Complainant;
  model = new complain('','','',0,'',null,'','','','','','');
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private userService:UserServiceProvider,
  private complainService:ComplainServiceProvider
  ) {
    this.orderInformation = this.navParams.data;
    if(this.orderInformation.buyer == this.userService.getCurrentUser().username){
      this.Complainant = "Buyer";
    }else{
      this.Complainant = "Seller";
    }
    console.log(this.Complainant)
    this.compainUser = this.userService.getCurrentUser().username == this.orderInformation.seller ? this.orderInformation.buyer : this.orderInformation.seller; 
    
    //console.log(this.compainUser)
  }

  submit(){
    this.model.pleader = this.compainUser;
    this.model.complainant = this.userService.getCurrentUser().username;
    this.model.orderId = this.orderInformation._id;
    this.model.crypto = this.orderInformation.crypto;
    this.model.fiat = this.orderInformation.fiat;
    this.model.role = this.Complainant;
    this.model.country = this.orderInformation.country;
    console.log(this.model);
    this.complainService.sendComplain(this.model).subscribe(result => {
      console.log(result);
      this.data.name = this.userService.getCurrentUser().username;
      this.data.roomname = JSON.parse(JSON.stringify(result))._id;
      let newData = this.ref.push();
      newData.set({
        roomname:this.data.roomname
      }); //定义房间名 并创建房间
      console.log(this.data.roomname+">>>>>>>>>>>")
      this.roomkey = getRoomKey(this.ref)   
      console.log(this.roomkey)
      this.complainService.addRoomKey(this.roomkey,this.data.roomname).subscribe();
      this.navCtrl.push(RoomPage, { complain: this.data.roomname , roomkey:this.roomkey , type:"complain"});
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ComplainInformationPage');
  }

}
export const getRoomKey = ref => {
  let roomkey ;
  ref.limitToLast(1).on("child_added",function(prevChildKey){
    //console.log("===>>>>" + prevChildKey.key) 
    roomkey = prevChildKey.key
  })//获取roomkey
  return roomkey;
};
