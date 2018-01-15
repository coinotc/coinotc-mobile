import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradeBuyMoneroPage } from './trade-buy-monero';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TradeBuyMoneroPage,
  ],
  imports: [
    IonicPageModule.forChild(TradeBuyMoneroPage),
    TranslateModule.forChild()
  ],
})
export class TradeBuyMoneroPageModule {}
