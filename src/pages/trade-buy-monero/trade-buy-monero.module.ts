import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradeBuyMoneroPage } from './trade-buy-monero';
import { TranslateModule } from '@ngx-translate/core';
import { MePageModule } from '../me/me.module';
@NgModule({
  declarations: [
    TradeBuyMoneroPage,
  ],
  imports: [
    IonicPageModule.forChild(TradeBuyMoneroPage),
    TranslateModule.forChild(),
    MePageModule
  ],
})
export class TradeBuyMoneroPageModule {}
