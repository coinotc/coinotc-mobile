import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradeSellStellarPage } from './trade-sell-stellar';
import { TranslateModule } from '@ngx-translate/core';
import { MePageModule } from '../me/me.module';
@NgModule({
  declarations: [
    TradeSellStellarPage,
  ],
  imports: [
    IonicPageModule.forChild(TradeSellStellarPage),
    TranslateModule.forChild(),
    MePageModule
  ],
})
export class TradeSellStellarPageModule {}
