import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradeSellEthereumPage } from './trade-sell-ethereum';
import { TranslateModule } from '@ngx-translate/core';
import { MePageModule } from '../me/me.module';


@NgModule({
  declarations: [
    TradeSellEthereumPage,
  ],
  imports: [
    IonicPageModule.forChild(TradeSellEthereumPage),
    TranslateModule.forChild(),
    MePageModule
  ],
})
export class TradeSellEthereumPageModule {}
