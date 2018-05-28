import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { KycServiceProvider } from "../../providers/kyc-service/kyc-service";
import * as _ from 'lodash';
import { CountryServiceProvider } from '../../providers/country-service/country-service';
import { Storage } from '@ionic/storage';
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
  countries: any[];
  baseCountry: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder,
    public kycService:KycServiceProvider,
    private loadingCtrl: LoadingController,
    private countryService:CountryServiceProvider,
    private storage: Storage,) {
      this.initializeCountries();
      this.storage.ready().then(() => this.storage.get('nativeCountry') as Promise<string>).then(value => {
        if (value != null) {
          console.log(value['country']);
          this.baseCountry = value['country'];
        } else {
          this.baseCountry = 'SG';
        }
      });
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
  initializeCountries() {
    this.countryService.getCountries().subscribe(countries => {
      console.log("currencies ==> " + countries);
      let countriesCode = _.keys(countries);
      let countriesDesc = _.values(countries);
      let countriesArr = [];

      for (let countryIndex in countriesCode) {
        let countryObj = {
          countriesCode: countriesCode[countryIndex],
          countriesDesc: countriesDesc[countryIndex]
        }
        countriesArr.push(countryObj);
      }
      this.countries = countriesArr;
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
  setBaseCountry() {
    console.log(this.baseCountry);
    console.log("set base country! " + this.baseCountry);
    let nativeCurry = {
      country: this.baseCountry
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad KycFormPage');
  }

}
