import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormBuilder,FormGroup,FormControl,Validators, } from '@angular/forms';
/**
 * Generated class for the GoogleAuthInputPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-google-auth-input',
  templateUrl: 'google-auth-input.html',
})
export class GoogleAuthInputPage {
  googleAuthForm:FormGroup;
  password_type = 'password';
  private PASSWORD_PATTERN = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,}$/;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fb: FormBuilder) {
      this.googleAuthForm = this.fb.group({
        googleAuthenticationCode: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6)]],
        password:['',Validators.compose([
          Validators.required,
          Validators.pattern(this.PASSWORD_PATTERN)
        ])
      ]
      });
  }
  togglePasswordMode() {
    console.log('toggle >>>> password ');
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GoogleAuthInputPage');
  }
  submitForm(){
    
  }
}
