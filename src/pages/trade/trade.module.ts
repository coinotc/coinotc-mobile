import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradePage } from './trade';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TradePage,
  ],
  imports: [
    IonicPageModule.forChild(TradePage),
    TranslateModule.forChild()
  ],
})
export class TradePageModule {}
