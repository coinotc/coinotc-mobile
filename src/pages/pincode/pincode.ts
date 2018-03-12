import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PincodeController } from  'ionic2-pincode-input/dist/pincode'
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

  code:string;
  
    constructor(
      public navCtrl: NavController,
      public pincodeCtrl: PincodeController,
    ) {

      let pinCode =  this.pincodeCtrl.create({
        title:'Pincode'
      });
      
      pinCode.present();
      
      pinCode.onDidDismiss( (code,status) => {
  
        if(status === 'done'){
  
          this.code = code;
          console.log(code)
        }else if (status === 'forgot'){
  
          // forgot password
        }
  
      })
  
    }
  

}
