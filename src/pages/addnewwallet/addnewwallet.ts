import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the AddnewwalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addnewwallet',
  templateUrl: 'addnewwallet.html'
})
export class AddnewwalletPage {
  walletForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder
  ) {
    this.walletForm = this.fb.group({
      cryptoCurrency: ['', Validators.required],
      walletName: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddnewwalletPage');
  }

  submitForm() {
    this.navCtrl.push('WalletPage');
  }
}
