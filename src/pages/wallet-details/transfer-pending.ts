import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { BrowserTab } from '@ionic-native/browser-tab';
import { CryptowalletProvider } from '../../providers/cryptowallet/cryptowallet';
import { Observable } from 'rxjs';
/**
 * Generated class for the WalletDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-transfer-pending',
  templateUrl: 'transfer-pending.html',
})
export class TransferPendingPage implements OnInit {
  segments: any = 'Receive';
  public cryptoType;
  transactionHistoryPending: any = null;
  transactionHistoryPendingArr =  new Array();
  transactionHistoryPendingObservable$: any;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private walletsvc: CryptowalletProvider,
              public loadingCtrl: LoadingController,
              public browserTab: BrowserTab) {
    this.cryptoType = navParams.get("cryptoType");
    console.log(`Crypto Type > ${this.cryptoType}`);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletDetailsPage');
  }

  openLink(hash){
    this.browserTab.isAvailable()
    .then(isAvailable => {
      if (isAvailable) {
        if('ETH' === this.cryptoType){
          this.browserTab.openUrl(`https://rinkeby.etherscan.io/tx/${hash}`);
        }
        
      } else {
        console.log("openurl failed!!!")
      }
    });
  }

  ngOnInit() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    
    this.walletsvc.getTransactionHistory(this.cryptoType).subscribe(result => {
      let jsonArr  = JSON.parse(result);
      jsonArr.forEach((value, idx)=>{
        if(value.status == 0){
          this.transactionHistoryPendingArr.push(value);
        }
      })
      this.transactionHistoryPending = this.transactionHistoryPendingArr;
      this.transactionHistoryPendingObservable$ = Observable.of(this.transactionHistoryPending);
      loader.dismiss().catch((error)=>{ console.log(error) });
    })
  }

}