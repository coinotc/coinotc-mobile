import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { CurrenciesServiceProvider } from '../../providers/currencies/currencies-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { BindEmailPage } from '../bind-email/bind-email';
import { BindPhonePage } from '../bind-phone/bind-phone';
import { ModifyPasswordPage } from '../modify-password/modify-password';
import { RealNameVerifiedPage } from '../real-name-verified/real-name-verified'
import { ModifyTradepasswordPage } from '../modify-tradepassword/modify-tradepassword'
import { Storage } from '@ionic/storage';

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
export class SettingsPage implements OnInit{
  currencies: any[];
  language: any;
  languages = [{ label: 'English', value: 'en' }, { label: '中文', value: 'cn' }];
  baseCurrency: any;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public translate: TranslateService, 
    public currencyService: CurrenciesServiceProvider,
    public userService: UserServiceProvider,
    private storage: Storage) 
  {
    this.initializeCurrencies();
    this.storage.ready().then(() => this.storage.get('nativeCurrency') as Promise<string>).then(value => {
      console.log(value['currency']);
      this.baseCurrency = value['currency'];
    });
    
    this.storage.ready().then(() => this.storage.get('preferLanguage') as Promise<string>).then(value => {
      let langObj = JSON.parse(JSON.stringify(value));
      this.language = langObj.language;
    });
  }

  ngOnInit() {
    console.log('ngOnInit');
  }
  
  initializeCurrencies(){
    this.currencyService.getCurrencies().subscribe(currencies=>{
      console.log("currencies ==> " + currencies);
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
    let preferLanguage = {
      language: this.language
    }
    this.userService.updateLanguage(preferLanguage).subscribe(result => {
      console.log(result);
      this.translate.use(this.language);
    }); 
  }
  
  realNameTapped() {
    this.navCtrl.push(RealNameVerifiedPage);
  }
  
  paymentPrdTapped() {
    this.navCtrl.setRoot(ModifyTradepasswordPage);
  }
  
  bindPhoneTapped() {
    this.navCtrl.push(BindPhonePage);
  }
  
  bindEmailTapped() {
    this.navCtrl.push(BindEmailPage);
  }
  
  passwordTapped() {
    this.navCtrl.push(ModifyPasswordPage);
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