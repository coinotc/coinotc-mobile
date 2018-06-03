import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';


import { CryptowalletProvider } from '../../providers/cryptowallet/cryptowallet';
import { Observable } from '@firebase/util';

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
  segments = 'Bitcoin';
  tradeSegments = 'Receive';
  walletInfo = null;
  walletBalance = {balance: 9999999999};
  // o$: Observable<any>;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public walletService  : CryptowalletProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

   
    
    // console.log(this.walletService.getWalletInfo())
  }

  balance(id, type) {
    if(this.walletInfo != null){
      this.walletService.getWalletBalance(id, type).subscribe(result => { 
        this.walletBalance = result;
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

  myAddress(walletAddress,segments) {
    // console.log(walletInfo)
    const alert = this.alertCtrl.create({
      title: `${segments} Address`,
      subTitle: `<img src='https://chart.googleapis.com/chart?cht=qr&chl=${walletAddress}&chs=180x180&choe=UTF-8&chld=L|2' alt='qr code'><br> ${walletAddress}`,
      buttons: ['Close']
    });
    alert.present();
  }

  onComfirm() {
    //To be done...
  }
  onSegment(){
    console.log("cliked")
  }
  ngOnInit() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
      
    
    this.walletService.getWalletInfo().subscribe(result => {
      this.walletInfo = result;
      loader.dismiss();
      console.log(this.walletInfo.id)
    })
    
   

  }
  // cryptoWalletSelected(wallet) {
  //   this.navCtrl.push('WalletDetailsPage');
  // }

  // addNewWallet() {
  //   this.navCtrl.push('AddnewwalletPage');
  // }
}
