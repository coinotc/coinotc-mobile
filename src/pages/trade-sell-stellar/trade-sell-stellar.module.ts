import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradeSellStellarPage } from './trade-sell-stellar';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TradeSellStellarPage,
  ],
  imports: [
    IonicPageModule.forChild(TradeSellStellarPage),
    TranslateModule.forChild()
  ],
})
export class TradeSellStellarPageModule {}
