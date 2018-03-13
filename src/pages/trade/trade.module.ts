import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradePage } from './trade';
import { TranslateModule } from '@ngx-translate/core';
import { MePageModule } from '../me/me.module';
@NgModule({
  declarations: [
    TradePage,
  ],
  imports: [
    IonicPageModule.forChild(TradePage),
    TranslateModule.forChild(),
    MePageModule
  ],
})
export class TradePageModule {}
