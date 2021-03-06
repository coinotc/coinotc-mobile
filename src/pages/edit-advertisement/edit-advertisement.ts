import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { advertisement } from '../../models/advertisement';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AdvertisementServiceProvider } from '../../providers/advertisement-service/advertisement-service';
/**
 * Generated class for the EditAdvertisementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-advertisement',
  templateUrl: 'edit-advertisement.html',
})
export class EditAdvertisementPage {
  // information: advertisement;
  adform: FormGroup;
  belowmax = true;
  notgetprice = true;
  rangepercent = 0;
  type;
  title: String;
  information = new advertisement(
    '',
    true,
    'ETHEREUM',
    'singapore',
    'SGD',
    null,
    null,
    null,
    [],
    null,
    '',
    null
  );
  cryptoprice: number;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private adservice: AdvertisementServiceProvider,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController) {
    this.adservice.getMyEditAdvertisement(navParams.data.information._id).subscribe(result => {
      this.information = result[0];
      console.log(this.information)
    })
    this.type = navParams.data.type;
    console.log(this.type)
    console.log(this.information)
    this.changerange();
    this.adservice.getprice('Ethereum', 'SGD').subscribe(result => {
      this.cryptoprice = Number(result[0].price_sgd);
      this.information.price = this.cryptoprice;
    });
    this.adform = this.fb.group({
      crypto: ['ETHEREUM', Validators.required],
      country: ['singapore', Validators.required],
      fiat: ['SGD', Validators.required],
      cryptoprice: [null, Validators.required],
      price: [null, [Validators.min(0)]],
      min_price: [null, [Validators.min(0), Validators.required]],
      max_price: [null, [Validators.min(0), Validators.required]],
      payment: ['', Validators.required],
      limit: [null, [Validators.min(15), Validators.max(60)]],
      message: ['', Validators.required]
    })
  }
  notbelowmax() {
    if (this.information.max_price && this.information.min_price) {
      if (Number(this.information.min_price) > Number(this.information.max_price)) {
        this.belowmax = true;
      } else {
        this.belowmax = false;
      }
    } else {
      this.belowmax = true;
    }
  }
  getcryptoprice() {
    switch (this.information.fiat) {
      case 'SGD':
        this.adservice.getprice(this.information.crypto, 'SGD').subscribe(result => {
          this.cryptoprice = Number(result[0].price_sgd);
          this.changerange();
        },
          error => this.changerange(error)
        );
        break;
      case 'CNY':
        this.adservice.getprice(this.information.crypto, 'CNY').subscribe(result => {
          this.cryptoprice = Number(result[0].price_cny);
          this.changerange();
        },
          error => this.changerange(error));
        break;
      case 'USD':
        this.adservice.getprice(this.information.crypto, 'USD').subscribe(result => {
          this.cryptoprice = Number(result[0].price_usd);
          this.changerange();
        },
          error => this.changerange(error));
        break;
      case 'KRW':
        this.adservice.getprice(this.information.crypto, 'KRW').subscribe(result => {
          this.cryptoprice = Number(result[0].price_krw);
          this.changerange();
        },
          error => this.changerange(error));
        break;
      case 'MYR':
        this.adservice.getprice(this.information.crypto, 'MYR').subscribe(
          result => {
            this.cryptoprice = Number(result[0].price_myr);
            this.changerange();
          },
          error => this.changerange(error)
        );
        break;
      case 'THB':
        this.adservice.getprice(this.information.crypto, 'THB').subscribe(
          result => {
            this.cryptoprice = Number(result[0].price_thb);
            this.changerange();
          },
          error => this.changerange(error)
        );
        break;
    }
  }
  changerange(error?) {
    if (error) {
      this.notgetprice = true;
    } else {
      this.notgetprice = false;
      this.information.price = this.cryptoprice;
    }
  }
  edit() {
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'loading...',
      //duration: 3500
    });
    this.adservice.editAdvertisement(this.information).subscribe(result => {
      loading.dismiss();
      console.log(result);
      this.navCtrl.pop();
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAdvertisementPage');
  }

}
