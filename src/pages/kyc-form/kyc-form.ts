import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { KycServiceProvider } from "../../providers/kyc-service/kyc-service";
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
    private fb: FormBuilder,
    public kycService:KycServiceProvider,
    private loadingCtrl: LoadingController) {
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
        passport:[
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
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'loading...',
      //duration: 3000,
      dismissOnPageChange: true
    });
    loading.present();
    const credentials = this.KYCForm.value;
    this.kycService.verifyName(credentials).subscribe(result=>{
      loading.dismiss();
      this.navCtrl.pop();
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad KycFormPage');
  }

}
