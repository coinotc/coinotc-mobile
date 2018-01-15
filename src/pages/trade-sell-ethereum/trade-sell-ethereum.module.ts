import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradeSellEthereumPage } from './trade-sell-ethereum';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TradeSellEthereumPage,
  ],
  imports: [
    IonicPageModule.forChild(TradeSellEthereumPage),
    TranslateModule.forChild()
  ],
})
export class TradeSellEthereumPageModule {}
