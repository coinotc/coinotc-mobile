import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , App } from 'ionic-angular';
import { FormBuilder,FormGroup,FormControl,Validators, } from '@angular/forms';

/**
 * Generated class for the GaEnterKeyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ga-enter-key',
  templateUrl: 'ga-enter-key.html',
})
export class GaEnterKeyPage {
  keyForm:FormGroup;
  backupKey;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fb: FormBuilder,
    public appCtrl:App) {
      this.backupKey = this.navParams.data.backupKey;
      console.log(this.backupKey)
    this.keyForm = this.fb.group({
      enterKey: ['', [Validators.required,this.matchValidator]],
    });
  }
  matchValidator = (control: FormControl): { [s: string]: boolean } => {
    if (control.value === this.backupKey)
      return {};
      else
      return { required: true };
  };
  ionViewDidLoad() {
    console.log('ionViewDidLoad GaEnterKeyPage');
  }
  submitForm(){
    this.appCtrl.getRootNav().push()
  }
}
