import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  ToastController
} from 'ionic-angular';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Errors } from '../../models/errors.model';
import { TabsPage } from '../../pages/tabs/tabs';
import { PaymentPrdPage } from '../payment-prd/payment-prd';
import { PincodePage } from '../pincode/pincode';
import { FCM, NotificationData } from '@ionic-native/fcm';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the AuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})
export class AuthPage {
  authType: 'register' | 'login' = 'login';
  isSubmitting = false;
  authForm: FormGroup;
  deviceToken;
  isModal: boolean; // show close button only in a modal
  constructor(
    public navCtrl: NavController,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private userService: UserServiceProvider,
    private params: NavParams,
    private fb: FormBuilder,
    private fcm: FCM,
    private platform: Platform
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.isModal = !!params.get('isModal');

    this.platform.ready().then(() => {
      this.fcm
        .getToken()
        .then((token: string) => {
          console.log('The token to use is: ', token);
          this.deviceToken = token;
        })
        .catch(error => {
          console.error(error);
        });
      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
        this.deviceToken = token;
      });
      this.fcm.onNotification().subscribe(
        (data: NotificationData) => {
          if (data.wasTapped) {
            console.log('Received in background', JSON.stringify(data));
          } else {
            console.log('Received in foreground', JSON.stringify(data));
          }
        },
        error => {
          console.error('Error in notification', error);
        }
      );
    });
  }

  matchValidator = (control: FormControl): { [s: string]: boolean } => {
    if(!control.value){
      return { required: true , errors:true }
    }else if(this.authForm.controls.password.value === control.value){
      return  { }
    }else{
      return { errors:true }
    }
  };

  authTypeChange() {
    if (this.authType === 'register') {
      this.authForm.addControl('username', new FormControl());
    } else {
      this.authForm.removeControl('username');
    }
    if (this.authType === 'login') {
      this.authForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    } else {
      this.authForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['',Validators.required]
        //confirmPassword: ['',[this.matchValidator]]
      });
    }
  }

  submitForm() {
    //console.log(this.authType =='login' || this.authForm.controls.password.value == this.authForm.controls.confirmPassword.value)
    if(this.authType =='login' || this.authForm.controls.password.value == this.authForm.controls.confirmPassword.value){
      this.isSubmitting = true;
      const credentials = this.authForm.value;
      //this.navCtrl.push(TabsPage,{});
      console.log('login success');
      this.userService.attemptAuth(this.authType, credentials, this.deviceToken).subscribe(
        user => {
          if (this.isModal) this.viewCtrl.dismiss();
          this.displayTabs();
          if(this.authType === 'register'){
          this.navCtrl.setRoot(PincodePage);
          }else{
          this.navCtrl.setRoot(TabsPage);
          }
        },
        (errors: Errors) => {
          for (let field in errors.errors) {
            this.toastCtrl
              .create({
                message: `${field} ${errors.errors[field]}`,
                duration: 3000
              })
              .present();
          }
          this.isSubmitting = false;
        }
      );
    }else{
      let toast = this.toastCtrl.create({
        message: 'Wrong type',
        duration: 3000,
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();
    }
  }

  private displayTabs() {
    let tabs = document.querySelectorAll('.tabbar.show-tabbar');

    if (tabs !== null) {
      Object.keys(tabs).map(key => {
        tabs[key].style.display = 'flex';
      });
    } // end if
  }
  close() {
    this.viewCtrl.dismiss();
  }
}
