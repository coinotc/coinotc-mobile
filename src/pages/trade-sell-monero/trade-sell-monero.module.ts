import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradeSellMoneroPage } from './trade-sell-monero';
import { TranslateModule } from '@ngx-translate/core';
import { MePageModule } from '../me/me.module';
@NgModule({
  declarations: [
    TradeSellMoneroPage,
  ],
  imports: [
    IonicPageModule.forChild(TradeSellMoneroPage),
    TranslateModule.forChild(),
    MePageModule
  ],
})
export class TradeSellMoneroPageModule {}
