import { Component } from '@angular/core';
import { IonicPage, 
         NavController, 
         NavParams,
         ToastController,
         LoadingController } from 'ionic-angular';
import { FormBuilder,
         FormGroup,
         FormControl,
         Validators,
         AbstractControl, 
         ValidationErrors, 
         ValidatorFn,
         AsyncValidatorFn } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Observable } from 'rxjs/Rx';
import { SettingsPage } from '../settings/settings';

/**
 * Generated class for the ModifyPrdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify-prd',
  templateUrl: 'modify-password.html',
})
export class ModifyPasswordPage {
  passwordForm: FormGroup;
  private PASSWORD_PATTERN = '^(?=.*d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{12,}$';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder,
    public userService:UserServiceProvider,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
    ) {
      let oldPasswordControl = new FormControl(
        '',
        {validators:Validators.compose([
          Validators.required,
          Validators.pattern(this.PASSWORD_PATTERN)
        ]), 
        asyncValidators: this.checkCurrentPassword(this.userService),
        updateOn: 'blur'}
      );
      let newPasswordControl = new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(this.PASSWORD_PATTERN)
        ])
      );
      let confirmPasswordControl = new FormControl(
        '',
        Validators.compose([Validators.required, this.equalTo(newPasswordControl)])
      );
    this.passwordForm = this.fb.group({
      oldPassword: oldPasswordControl,
      newPassword: newPasswordControl,
      confirmNewPassword: confirmPasswordControl
    })
  }

  checkCurrentPassword(userService: UserServiceProvider): AsyncValidatorFn{
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      let input = control.value;
      console.log(input);
      if(input != ''){
        return userService.checkChgPasswordUser(this.userService.getCurrentUser(), input).map(result=>{
            console.log("zzzz" +result);
            if(result == 0){
              console.log('>>>> result ');
              return { isValid: true, required: false };
            }else{
              return null;
            }
        });
      }
    };

  }

  equalTo(equalControl: AbstractControl): ValidatorFn {
    let subscribe = false;
    return (control: AbstractControl): ValidationErrors | null => {
      if (!subscribe) {
        subscribe = true;
        equalControl.valueChanges.subscribe(() => {
          control.updateValueAndValidity();
        });
      }
      let input = control.value;
      console.log(input);
      console.log('equalControl.value' + equalControl.value);
      let isValid = equalControl.value == input;
      console.log('isValid> ' + isValid);
      if (!isValid) {
        console.log('>>>>');
        return { isValid: true, required: false };
      } else {
        return null;
      }
    };
  }

  submitForm() {
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'loading...',
      duration: 3000
    });
    loading.present();
    const credentials = this.passwordForm.value;
    this.userService.changePassword(credentials, this.userService.getCurrentUser()).subscribe(result =>{
      if(result != null){
        loading.dismiss();
        this.toastCtrl
          .create({
            message: "Password changed.",
            duration: 3500
          })
        .present();
        this.navCtrl.push(SettingsPage);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyPrdPage');
  }

}
