import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { adinformation } from'../../models/adinformation';
import { AdvertisementServiceProvider } from '../../providers/advertisement-service/advertisement-service'
/**
 * Generated class for the AddadvertisementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addadvertisement',
  templateUrl: 'addadvertisement.html',
})
export class AddadvertisementPage {
  rangepercent = 0; type: String; title: String; information = new adinformation('',true,'ETH','singapore','SGD',null,null,null,'',null,'');
  cryptoprice = 105483.45;
  constructor(public navCtrl: NavController, public navParams: NavParams, private adservice:AdvertisementServiceProvider) {
    this.type = navParams.data.type;
    this.title = navParams.data.title;
    this.changerange();
  }
  changerange(){
    this.information.price = Number((this.cryptoprice * (100 + this.rangepercent )/100).toFixed(4)) ;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddadvertisementPage');
  }
  addbuyad(){
    this.information.owner = "kaze ai tomo";
    this.adservice.addadbuy(this.information).subscribe(result=>{
      console.log(result);
      this.navCtrl.pop();
    });
  }
  addsellad(){
    this.information.owner = "kaze ai tomo";
    this.adservice.addadsell(this.information).subscribe(result=>{
      console.log(result);
      this.navCtrl.pop();
    });
  }
}
