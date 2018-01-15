import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradeBuyEthereumPage } from './trade-buy-ethereum';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TradeBuyEthereumPage,
  ],
  imports: [
    IonicPageModule.forChild(TradeBuyEthereumPage),
    TranslateModule.forChild()
  ],
})
export class TradeBuyEthereumPageModule {}
