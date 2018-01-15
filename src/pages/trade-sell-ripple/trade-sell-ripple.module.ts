import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradeSellRipplePage } from './trade-sell-ripple';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TradeSellRipplePage,
  ],
  imports: [
    IonicPageModule.forChild(TradeSellRipplePage),
    TranslateModule.forChild()
  ],
})
export class TradeSellRipplePageModule {}
