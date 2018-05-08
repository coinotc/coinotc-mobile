import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GoogleAuthServiceProvider } from '../../providers/google-auth-service/google-auth-service';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the UnbindGoogleAuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-unbind-google-auth',
  templateUrl: 'unbind-google-auth.html',
})
export class UnbindGoogleAuthPage {
  googleAuthForm: FormGroup;
  password_type = 'password';
  private PASSWORD_PATTERN = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,}$/;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fb: FormBuilder,
    public googleAuthService: GoogleAuthServiceProvider,
    private toastCtrl: ToastController) {
    this.googleAuthForm = this.fb.group({
      googleAuthenticationCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      password: ['', Validators.compose([
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
    console.log('ionViewDidLoad UnbindGoogleAuthPage');
  }
  submitForm() {

    let credentials = this.googleAuthForm.value;
    console.log(credentials)
    this.googleAuthService.unbind(credentials).subscribe(result => {
      console.log(result)
      if (result == 0) {
        this.toastCtrl
          .create({
            message: "Unbind Success",
            duration: 3000
          })
          .present();
        this.navCtrl.push(TabsPage);
      }
      else if (result == 1) {
        this.toastCtrl
          .create({
            message: "Google Authentication Code is not correct",
            duration: 3000
          })
          .present();
      } else {
        this.toastCtrl
          .create({
            message: "Login Password is not correct",
            duration: 3000
          })
          .present();
      }
    })
  }
}
