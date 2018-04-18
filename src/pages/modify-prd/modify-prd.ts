import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder,FormGroup,FormControl,Validators,AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';
/**
 * Generated class for the ModifyPrdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify-prd',
  templateUrl: 'modify-prd.html',
})
export class ModifyPrdPage {
  passwordForm: FormGroup;
  private PASSWORD_PATTERN = '^(?=.*d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{12,}$';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder,
    public userService:UserServiceProvider) {
      let oldPasswordControl = new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(this.PASSWORD_PATTERN)
        ])
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
    const credentials = this.passwordForm.value;
    this.userService.changePassword(credentials).subscribe(
      
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyPrdPage');
  }

}
