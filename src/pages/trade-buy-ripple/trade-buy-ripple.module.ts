import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradeBuyRipplePage } from './trade-buy-ripple';
import { TranslateModule } from '@ngx-translate/core';
import { MePageModule } from '../me/me.module';
@NgModule({
  declarations: [
    TradeBuyRipplePage,
  ],
  imports: [
    IonicPageModule.forChild(TradeBuyRipplePage),
    TranslateModule.forChild(),
    MePageModule
  ],
})
export class TradeBuyRipplePageModule {}
