import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradeBuyStellarPage } from './trade-buy-stellar';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TradeBuyStellarPage,
  ],
  imports: [
    IonicPageModule.forChild(TradeBuyStellarPage),
    TranslateModule.forChild()
  ],
})
export class TradeBuyStellarPageModule {}
