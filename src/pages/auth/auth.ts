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
//import { PaymentPrdPage } from '../payment-prd/payment-prd';

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
  isModal: boolean; // show close button only in a modal

  constructor(
    public navCtrl: NavController,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private userService: UserServiceProvider,
    private params: NavParams,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['']
    });
    this.isModal = !!params.get('isModal');
  }

  authTypeChange() {
    if (this.authType === 'register') {
      this.authForm.addControl('username', new FormControl());
    } else {
      this.authForm.removeControl('username');
    }
  }

  submitForm() {
    this.isSubmitting = true;
    const credentials = this.authForm.value;
    //this.navCtrl.push(TabsPage,{});
    console.log('login success');
    this.userService.attemptAuth(this.authType, credentials).subscribe(
      user => {
        if (this.isModal) this.viewCtrl.dismiss();
        this.displayTabs();
        // if(this.authType === 'register'){
        // this.navCtrl.push(PaymentPrdPage);
        // }else{
        //   this.navCtrl.setRoot(TabsPage,this.userService.getCurrentUser());
        // }
        this.navCtrl.setRoot(TabsPage, this.userService.getCurrentUser());
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
