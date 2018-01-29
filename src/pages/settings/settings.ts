import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { CurrenciesServiceProvider } from '../../providers/currencies/currencies-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  currencies: any[];
  language: any;
  languages = [{ label: 'English', value: 'en' }, { label: '中文', value: 'cn' }];
  baseCurrency: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public translate: TranslateService, public currencyService: CurrenciesServiceProvider,
    public userService: UserServiceProvider) {
    this.initializeCurrencies();
  }
  
  initializeCurrencies(){
    this.currencyService.getCurrencies().subscribe(currencies=>{
      let currenciesCode = _.keys(currencies);
      let currenciesDesc = _.values(currencies);
      let currenciesArr = [];
     
      for (let currencyIndex in currenciesCode) {
        let currencyObj = {
          currenciesCode: currenciesCode[currencyIndex],
          currenciesDesc: currenciesDesc[currencyIndex]
        }
        currenciesArr.push(currencyObj);
      }
      this.currencies = currenciesArr;
    });
  }
  switchLanguage() {
    this.translate.use(this.language);
  }
  
  realNameTapped() {
    this.navCtrl.push("RealNameVerifiedPage");
  }
  
  paymentPrdTapped() {
    this.navCtrl.push("PaymentPrdPage");
  }
  
  bindPhoneTapped() {
    this.navCtrl.push("BindPhonePage");
  }
  
  bindEmailTapped() {
    this.navCtrl.push("BindEmailPage");
  }
  
  passwordTapped() {
    this.navCtrl.push("ModifyPrdPage");
  }

  setBaseCurrency(){
    console.log(this.baseCurrency);
    console.log("set base currency! " + this.baseCurrency);
    let nativeCurry = {
      currency: this.baseCurrency
    }
    this.userService.updateBaseCurrency(nativeCurry).subscribe(result => {
      console.log(result);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

};