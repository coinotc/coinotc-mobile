import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { PincodeController } from  'ionic2-pincode-input/dist/pincode';
import { TabsPage } from '../tabs/tabs';
import { PincodePage } from '../pincode/pincode';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ProfileServiceProvider } from '../../providers/profile-service/profile-service';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ConfirmPincodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm-pincode',
  templateUrl: 'confirm-pincode.html',
})
export class ConfirmPincodePage {
  currentUserName;
  comfirmcode:Number;
  password:Number;
  private type;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public pincodeCtrl: PincodeController,    
    private userService: UserServiceProvider,
    private profileService: ProfileServiceProvider,
    private toastCtrl: ToastController,
  ) {
      this.type = this.navParams.data.type;
      console.log(this.type)
      this.currentUserName = this.userService.getCurrentUser().username
      this.password = navParams.data.code
      let pinCode =  this.pincodeCtrl.create({
        title:'Pincode',
        hideForgotPassword:true,
        hideCancelButton:true
      });
      pinCode.present();
      pinCode.onDidDismiss( (code,status) => 
        {
          this.comfirmcode = code;
          if(this.password == this.comfirmcode){
            this.password = JSON.parse(JSON.stringify(this.password))
            this.profileService.settradepassword(this.currentUserName, this.password).subscribe();
            this.navCtrl.setRoot(TabsPage);
          }else{
            let toast = this.toastCtrl.create({
              message: 'Wrong type',
              duration: 3000,
            });
            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });
            toast.present();
            this.navCtrl.setRoot(PincodePage);
          }
      })
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPincodePage');
  }

}
