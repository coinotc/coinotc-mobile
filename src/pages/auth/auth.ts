import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  ToastController,
  
} from 'ionic-angular';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Errors } from '../../models/errors.model';
import { TabsPage } from '../../pages/tabs/tabs';
import { PaymentPrdPage } from '../payment-prd/payment-prd';
import { PincodePage } from '../pincode/pincode'

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
  password = 'password';
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
        password: ['', Validators.required]
      });
    this.isModal = !!params.get('isModal');
  }

  // matchValidator = (control: FormControl): { [s: string]: any } => {
  //   if(!control.value){
  //     return { required: true , errors:true}
  //   }else if(this.authForm.controls.password.value === control.value){
  //     return { errors:"111" }
  //   }else{
  //     return { errors:true}
  //   }
  // }
  // matchPasswordValidator = (control: FormControl): { [s: string]: boolean } => {
  //   console.log(control)
  // return
  // }
  
  authTypeChange() {
    if (this.authType === 'register') {
      this.authForm.addControl('username', new FormControl());
    } else {
      this.authForm.removeControl('username');
    }
    if(this.authType === 'login'){
      this.authForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    }else{
      this.authForm = this.fb.group({
        username :['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['',[Validators.required,this.equals(this.password)]]
        //confirmPassword: ['',[this.matchValidator]]
      });
    }
  }
  
  equals(fieldName: string){
    let fcfirst: FormControl;
    let fcSecond: FormControl;
    return function matchValidator(control: FormControl) {
        if (!control.parent) {
            return null;
        }
        // INITIALIZING THE VALIDATOR.
        if (!fcfirst) {
            //INITIALIZING FormControl first
            fcfirst = control;
            fcSecond = control.parent.get("password") as FormControl;
            //FormControl Second
            if (!fcSecond) {
                throw new Error('matchValidator(): Second control is not found in the parent group!');
            }
            fcSecond.valueChanges.subscribe(() => {
                fcfirst.updateValueAndValidity();
            });
        }
        if (!fcSecond) {
            return null;
        }
        if (fcSecond.value !== fcfirst.value) {
            return {
                matchOther: true
            };
        }
        return null;
    }
}
  
  submitForm() {
    console.log(this.authForm.controls)
    //console.log(this.authType =='login' || this.authForm.controls.password.value == this.authForm.controls.confirmPassword.value)
    //if(this.authType =='login' || this.authForm.controls.password.value == this.authForm.controls.confirmPassword.value){
      this.isSubmitting = true;
      const credentials = this.authForm.value;
      console.log('login success');
      this.userService.attemptAuth(this.authType, credentials).subscribe(
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
    // }else{
    //   let toast = this.toastCtrl.create({
    //     message: 'Wrong type',
    //     duration: 3000,
    //   });
    //   toast.onDidDismiss(() => {
    //     console.log('Dismissed toast');
    //   });
    //   toast.present();
    // }
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

