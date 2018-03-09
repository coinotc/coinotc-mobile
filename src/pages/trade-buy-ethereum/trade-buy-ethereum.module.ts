import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradeBuyEthereumPage } from './trade-buy-ethereum';
import { TranslateModule } from '@ngx-translate/core';
import { MePageModule } from '../me/me.module';
@NgModule({
  declarations: [
    TradeBuyEthereumPage,
  ],
  imports: [
    IonicPageModule.forChild(TradeBuyEthereumPage),
    TranslateModule.forChild(),
    MePageModule
  ],
})
export class TradeBuyEthereumPageModule {}
