import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
/**
 * Generated class for the KycFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kyc-form',
  templateUrl: 'kyc-form.html',
})
export class KycFormPage {
  KYCForm: FormGroup;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder) {
      this.KYCForm = this.fb.group({
        firstName: [
          '',
          Validators.compose([Validators.required])
        ],
        lastName: [
          '',
          Validators.compose([
            Validators.required
          ])
        ],
        gender:[
          '',
          Validators.compose([Validators.required])
        ],
        country:[
          '',
          Validators.compose([Validators.required])
        ]
      });
  }
  submitForm() {
    console.log(this.KYCForm.value.country)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad KycFormPage');
  }

}
