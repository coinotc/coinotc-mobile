import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradeSellMoneroPage } from './trade-sell-monero';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TradeSellMoneroPage,
  ],
  imports: [
    IonicPageModule.forChild(TradeSellMoneroPage),
    TranslateModule.forChild()
  ],
})
export class TradeSellMoneroPageModule {}
