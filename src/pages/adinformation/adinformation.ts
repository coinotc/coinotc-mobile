import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { adinformation } from '../../models/adinformation';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { OrderInformation } from '../order-window/orderInformation';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { OrderWindowPage } from '../order-window/order-window';

/**
 * Generated class for the AdinformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adinformation',
  templateUrl: 'adinformation.html',
})
export class AdinformationPage {
  disabled=true ;information: adinformation; title: string; tradetype: { type: String, crypto: String }; user: { order: 200, goodorder: 148, }; range; loading; orderinformation = new OrderInformation(null, null, null, null, null, null, null, null, null, null, false);
  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserServiceProvider, public loadingCtrl: LoadingController, public orderservice: OrderServiceProvider) {
    this.tradetype = navParams.data.tradetype;
    this.information = navParams.data.information;
    console.log(this.information); console.log(this.tradetype);
    this.user = {
      order: 200,
      goodorder: 148,
    }
    this.orderinformation.price = this.information.price;
    this.range = Math.trunc(this.user.goodorder / this.user.order * 100);
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 5000
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdinformationPage');
  }
  makeorder() {
    this.loading.present();
    this.orderinformation.crypto = this.information.crypto;
    this.orderinformation.country = this.information.country;
    this.orderinformation.fiat = this.information.fiat;
    this.orderinformation.payment = this.information.payment;
    this.orderinformation.limit = this.information.limit;
    if (this.tradetype.type == "buy") {
      this.orderinformation.buyer = this.userservice.getCurrentUser().username;
      this.orderinformation.seller = this.information.owner;
    } else {
      this.orderinformation.seller = this.userservice.getCurrentUser().username;
      this.orderinformation.buyer = this.information.owner;
    }
    // console.log(this.orderinformation);
    this.orderservice.postorder(this.orderinformation).subscribe(result=>{
      console.log(result);
      let owner = this.information.owner
      this.loading.dismiss();
      this.navCtrl.push(OrderWindowPage,{ order:result, trader:owner});
    })
  }
  amountchange() {
    this.orderinformation.quantity = this.orderinformation.amount / this.orderinformation.price;
    if(this.orderinformation.amount > this.information.min_price){
      if(this.orderinformation.amount < this.information.max_price){
        if (this.information.owner != this.userservice.getCurrentUser().username){
          this.disabled = false;
        }
      }
      else{
        this.disabled = true;
      }
    }
    else{
      this.disabled = true;
    }
  }
  quantitychange() {
    this.orderinformation.amount = this.orderinformation.quantity * this.orderinformation.price;
    if(this.orderinformation.amount > this.information.min_price){
      if(this.orderinformation.amount < this.information.max_price){
        if (this.information.owner != this.userservice.getCurrentUser().username){
          this.disabled = false;
        }
      }
      else{
        this.disabled = true;
      }
    }
    else{
      this.disabled = true;
    }
  }

}
