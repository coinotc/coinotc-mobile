import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController } from 'ionic-angular';
import { ComplainServiceProvider } from '../../providers/complain-service/complain-service';
import { Observable } from 'rxjs';
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
  message = { content: '', date: null, role: '' };
  complain;
  complainChat;
  leaveMess = '';
  complainStatus;
  chatsObservable$: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public complainService:ComplainServiceProvider,
    public modalCtrl: ModalController) {
    
    this.complain = this.navParams.data.complain;
    this.complainStatus = this.complain.status;
    console.log(this.complainStatus)
    this.chatsObservable$ = Observable.of(this.complain.message);
      //console.log(this.complain.message)
  }
  onPost() {
    this.message.content = this.leaveMess;
    this.message.date = new Date();
    this.message.role = 'user';
    this.complain.message.unshift(this.message);
    console.log(this.complain.message)
    this.complainService
      .patchnewMessage(this.complain._id, this.complain.message)
      .subscribe(result => {
        this.complain = result
        this.leaveMess = '';
      });
  }
  changeStatus() {
    this.complainService.changeStatus(this.complain._id,3).subscribe(result => {
      //this.listToComplainChatService.complainResult.subscribe(complain => this.complain = complain);
      //this.navCtrl.pop()
      this.complain = result;
      console.log(result)
      this.complainStatus = result.status;
      
      //this
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerSupportPage');
  }

}
