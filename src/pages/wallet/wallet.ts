import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { CryptowalletProvider } from '../../providers/cryptowallet/cryptowallet';
import { Observable } from 'rxjs/Rx';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { WalletDetailsPage } from '../wallet-details/wallet-details';
/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html'
})

export class WalletPage implements OnInit{
  private scannedText: string;
  segments = 'ETH';
  tradeSegments = 'Receive';
  walletInfo = null;
  selectedType = "ETH";
  walletBalance = { balance: 0  };
  walletForm: FormGroup;
  // o$: Observable<any>;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public walletService  : CryptowalletProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private barcodeScanner: BarcodeScanner,
    private fb: FormBuilder,
  ) {
    this.walletForm = this.fb.group({
      address: [
        '',
        Validators.compose([Validators.required])
      ],
      amount: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)
        ])
      ],
      notes: [
        ''
      ],
    });
   
    
    // console.log(this.walletService.getWalletInfo())
  }

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedText = barcodeData.text;
     }).catch(err => {
         console.log('Error', err);
     });
  }

  balance(id, type) {
    this.selectedType = type;
    if(this.walletInfo != null){
      this.walletService.getWalletBalance(id, type).subscribe(result => {
        console.log(type);
        if(type =='ADA'){
          console.log("its ADA!");
          this.walletBalance = {balance: +result.balance/1000000};;
        }else{
          this.walletBalance = result;
        }
        console.log(this.walletBalance.balance)
      })
    }else{
      this.balance(id, type);
    }
    
    //To be done...
  }
  
  onCopy() {
    //To be done...
  }

  showTransactionHistory(type){
    console.log(type);
    this.navCtrl.push(WalletDetailsPage, {cryptoType: type});
  }

  myAddress(walletAddress,segments) {
    // console.log(walletInfo)
    const alert = this.alertCtrl.create({
      title: `${segments} Address`,
      subTitle: `<img src='https://chart.googleapis.com/chart?cht=qr&chl=${walletAddress}&chs=180x180&choe=UTF-8&chld=L|2' alt='qr code'><br> ${walletAddress}`,
      buttons: ['Close']
    });
    alert.present();
  }

  onComfirm(type) {
    const loader = this.loadingCtrl.create({
      content: "Transferring...",
    });
    loader.present();
    console.log("Sending ... crypto ");
    console.log(type);
    const transfers = this.walletForm.value;
    transfers.type = type;
    console.log(JSON.stringify(transfers));
    this.walletService.transfer(transfers).subscribe(result => {
      this.walletInfo = result;
      loader.dismiss().catch((error)=>{console.log(error)});
      console.log(this.walletInfo.id)
    },
    error => {
      console.log(error);
      loader.dismiss().catch((error)=>{ console.log(error) });
    },
    () => {
      loader.dismiss().catch((error)=>{ console.log(error)});
    })
  }

  onSegment(){
    console.log("clicked")
  }

  ngOnInit() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
      
    
    this.walletService.getWalletInfo().subscribe(result => {
      this.walletInfo = result;
      console.log(this.walletInfo.id)
      loader.dismiss().catch((error)=>{ console.log(error) });
    })
  }

}
