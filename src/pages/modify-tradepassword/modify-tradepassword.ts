import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PincodeController } from 'ionic2-pincode-input/dist/pincode';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { PincodePage } from '../pincode/pincode';
import { MePage } from '../me/me';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the ModifyTradepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify-tradepassword',
  templateUrl: 'modify-tradepassword.html',
})
export class ModifyTradepasswordPage {
  code: Number;
  tradePrd: Number;
  private user;
  private pinCode;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public pincodeCtrl: PincodeController,
    private toastCtrl: ToastController,
    private userService: UserServiceProvider) {

    // this.user = userService.getTradepassword(this.userService.getCurrentUser().username).subscribe( result =>{
    //   this.tradePrd = JSON.parse(JSON.stringify(result));
    //   this.tradePrd = this.tradePrd[0].tradePrd;
    // })
    this.pinCode = this.pincodeCtrl.create({
      title: 'Pincode',
      hideForgotPassword: true,
      enableBackdropDismiss: false,
      //hideCancelButton:true,
      cancelButtonText: "cancel"
    });
    this.pinCode.present();
    this.pinCode.onDidDismiss((code, status) => {
      if (status === 'cancel') {
        //this.navCtrl.setRoot(MePage);
        this.navCtrl.setRoot(TabsPage)
      } else {
        this.code = code;
        //if(this.code.toString.length == 6 ){
        this.userService.getTradepassword(this.userService.getCurrentUser().username, this.code).
          subscribe(result => {
            console.log(result)
            if (result) {
              this.navCtrl.push(PincodePage, { type: "change tradePrd" })
            } else {
              this.toastCtrl
                .create({
                  message: `TradePassword is wrong. Please try again.`,
                  duration: 3000
                })
                .present();
              this.navCtrl.setRoot(this.navCtrl.getActive().component)
            }
          })
        //console.log(this.tradePrd)

      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyTradepasswordPage');
  }

}
