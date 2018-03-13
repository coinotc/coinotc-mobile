import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PincodeController } from  'ionic2-pincode-input/dist/pincode'
import { ConfirmPincodePage } from '../confirm-pincode/confirm-pincode'
/**
 * Generated class for the PincodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pincode',
  templateUrl: 'pincode.html',
})
export class PincodePage {

  code:Number;
    constructor(
      public navCtrl: NavController,
      public pincodeCtrl: PincodeController,
    ) {
          let pinCode =  this.pincodeCtrl.create({
            title:'Pincode',
            hideForgotPassword:true,
            hideCancelButton:true
          });
          pinCode.present();
          pinCode.onDidDismiss( (code,status) => 
            {
              this.code = code;
              this.navCtrl.setRoot(ConfirmPincodePage,{code:this.code});
          })
          

  }
}
