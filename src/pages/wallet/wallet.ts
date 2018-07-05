import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Clipboard } from '@ionic-native/clipboard';
import { CryptowalletProvider } from '../../providers/cryptowallet/cryptowallet';
import { Observable } from 'rxjs/Rx';
import { concatMap, mapTo } from 'rxjs/operators';
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
  selectedType = "ETH";
  tradeSegments = 'Receive';
  loader;
  public walletBalance = { balance: 0  };
  walletInfo = {
    id: 1,
    ETH: {
        address: 1
    
    },
    ADA: {
        address: 1
     
    },
    XRP: {
        address:1
  
    },
    XLM: {
        address: 1

    },
    XMR: {
        address: 1

    }
  };
  walletForm: FormGroup;
  // o$: Observable<any>;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public walletService  : CryptowalletProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private barcodeScanner: BarcodeScanner,
    private fb: FormBuilder,
    private clipboard:  Clipboard
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

  }

  copy(address){
    console.log("BEFORE COPY" + address );
    this.clipboard.copy(address);
    console.log(this.clipboard.copy(address))
    const loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: "Your Ethereum Address has been copied to your clipboard!",
      duration: 1000
    });
    loader.present();
  }

  scan(){
    this.barcodeScanner.scan({
        preferFrontCamera : false, // iOS and Android
        showFlipCameraButton : true, // iOS and Android
        showTorchButton : true, // iOS and Android
        torchOn: false, // Android, launch with the torch switched on (if available)
        prompt : "Place a barcode inside the scan area", // Android
        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
        formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
        orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
        disableAnimations : true, // iOS
        disableSuccessBeep: true // iOS and Android
    }).then(barcodeData => {
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
        console.log("ADD ID!"+id)
        if(type === 'ADA'){
          console.log("its ADA!");
          const spin = this.loadingCtrl.create({
            content: "Loading. . .",
            duration: 500
          });
          spin.present();
          this.walletBalance = {balance: +result.balance/1000000};
          
        
        }else if (type === 'XMR'){
          console.log("its XMR!");
          const spin = this.loadingCtrl.create({
            content: "Loading. . .",
            duration: 500
          });
          spin.present();
          this.walletBalance = {balance: +result.balance/1000000000000};;
        }else{
          const spin = this.loadingCtrl.create({
            content: "Loading. . .",
            duration: 500
          });
          spin.present();
          console.log(">>>>>" + result)
          this.walletBalance = result; 
          console.log("BALANCE"+ this.walletBalance)
        }
        
        console.log(this.walletBalance.balance)
      })
    }else{
      this.balance(id, type);
    } 
      
    

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

  onConfirm(type) {
    console.log("this loader .... confirm  " + this.loader);
    if(!this.loader){
      this.loader = this.loadingCtrl.create({
        content: "Transferring...",
      });
      this.loader.present();
    }

    console.log("Sending ... crypto ");
    console.log(type);
    const transfers = this.walletForm.value;
    transfers.type = type;
    console.log(JSON.stringify(transfers));
    this.walletService.transfer(transfers).subscribe(result => {
      this.walletInfo = result;
      if(this.loader){
        this.loader.dismiss().catch((error)=>{console.log(error)});
        this.loader = null;
      }
      console.log(this.walletInfo.id)
    },
    error => {
      console.log(error);
      if(this.loader){
        this.loader.dismiss().catch((error)=>{console.log(error)});
        this.loader = null;
      }
    },
    () => {
      if(this.loader){
        this.loader.dismiss().catch((error)=>{console.log(error)});
        this.loader = null;
      }
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
      console.log("ITS ETH!" + this.walletInfo.ETH.address)
      this.balance(this.walletInfo.id,'ETH');
      loader.dismiss();
      console.log(this.walletInfo.id);
      console.log("ITS ETH2!" + this.walletInfo.ETH.address)
      console.log("ETH BAL!" + this.walletBalance.balance)
    })
  
  }
}
