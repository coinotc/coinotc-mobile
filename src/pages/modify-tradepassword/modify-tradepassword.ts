import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,App} from 'ionic-angular';
import { PincodeController } from  'ionic2-pincode-input/dist/pincode';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs/Observable';
import { PincodePage } from '../pincode/pincode';
import { MePage } from '../me/me';
import { SettingsPage } from '../settings/settings'
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
  code:Number;
  tradePrd:Number;
  private user;
  private pinCode;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public pincodeCtrl: PincodeController,
    private userService: UserServiceProvider,
    private appCtrl:App) {
     
    this.user = userService.getTradepassword(this.userService.getCurrentUser().username).subscribe( result =>{
      this.tradePrd = JSON.parse(JSON.stringify(result));
      this.tradePrd = this.tradePrd[0].tradePrd;
    })
      this.pinCode =  this.pincodeCtrl.create({
      title:'Pincode',
      hideForgotPassword:true,
      //hideCancelButton:true,
      cancelButtonText:"cancel"
    });
    this.pinCode.present();
    this.pinCode.onDidDismiss( (code,status) => 
      {
        if(status === 'cancel'){
          //this.navCtrl.setRoot(MePage);
          this.navCtrl.setRoot(MePage)
        }else{
          this.code = code;
          //if(this.code.toString.length == 6 ){
          console.log(this.tradePrd)
          if(this.code == this.tradePrd){
            console.log(11111111111)
            this.navCtrl.push(PincodePage,{type:"change tradePrd"})
          }else if(this.code != this.tradePrd){
            this.navCtrl.setRoot(this.navCtrl.getActive().component)
          }
        }
        //console.log(status)
        
    })
  }
  // goBack(){
  //   console.log(666666666666)
  //   this.pinCode.present();
  //   this.pinCode.onDidDismiss( (code,status) => {
  //     console.log(1111)
  //     this.appCtrl.getRootNav().push(MePage);
  //   })
    
  //   this.appCtrl.getRootNav().push(MePage);
  //   // this.navCtrl.setRoot(SettingsPage).then
  //   // {
  //   //   this.navCtrl.setRoot(MePage);
  //   // }
  // }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyTradepasswordPage');
  }

}
