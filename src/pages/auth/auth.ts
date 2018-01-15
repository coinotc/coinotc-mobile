import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController, ToastController,  } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Errors } from '../../models/errors.model';
import { TabsPage } from '../../pages/tabs/tabs';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the AuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {
  authType: 'register' | 'login' = 'login';
  isSubmitting = false;
  authForm: FormGroup;
  isModal: boolean; // show close button only in a modal
  //public pet;
  constructor(
    public navCtrl: NavController,
    private viewCtrl: ViewController,
    private toastCtrl:ToastController,
    private userService: UserServiceProvider,
    private params: NavParams,
    private fb: FormBuilder,
    private translate: TranslateService
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'confirmPassword': [''],
    });
    this.isModal = !!params.get('isModal');
    translate.setDefaultLang('cn');
    translate.use('cn');
  }
  authTypeChange() {
    if (this.authType === 'register') {
      this.authForm.addControl('username', new FormControl());
    }else{
      this.authForm.removeControl('username');
    }
  }
  submitForm() {
    this.isSubmitting = true;
    const credentials = this.authForm.value;
    this.userService.attemptAuth(this.authType, credentials).subscribe(
      user => {
        if(this.isModal) this.viewCtrl.dismiss();
        this.navCtrl.push(TabsPage);
      },
      (errors:Errors) => {
        for(let field in errors.errors){
          this.toastCtrl.create({
            message:`${field} ${errors.errors[field]}`,
            duration:3000
          }).present();
        }
        this.isSubmitting = false;
      }
    );
  }
  close() {
    this.viewCtrl.dismiss();
  }
}
 