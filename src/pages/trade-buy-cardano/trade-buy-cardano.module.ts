import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradeBuyCardanoPage } from './trade-buy-cardano';
import { TranslateModule } from '@ngx-translate/core';
import { MePageModule } from '../me/me.module';
@NgModule({
  declarations: [
    TradeBuyCardanoPage,
  ],
  imports: [
    IonicPageModule.forChild(TradeBuyCardanoPage),
    TranslateModule.forChild(),
    MePageModule
  ],
})
export class TradeBuyCardanoPageModule {}
