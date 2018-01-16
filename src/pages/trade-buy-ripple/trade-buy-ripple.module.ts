import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradeBuyRipplePage } from './trade-buy-ripple';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TradeBuyRipplePage,
  ],
  imports: [
    IonicPageModule.forChild(TradeBuyRipplePage),
    TranslateModule.forChild()
  ],
})
export class TradeBuyRipplePageModule {}
