import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradeSellCardanoPage } from './trade-sell-cardano';
import { TranslateModule } from '@ngx-translate/core';
import { MePageModule } from '../me/me.module';
@NgModule({
  declarations: [
    TradeSellCardanoPage,
  ],
  imports: [
    IonicPageModule.forChild(TradeSellCardanoPage),
    TranslateModule.forChild(),
    MePageModule
  ],
})
export class TradeSellCardanoPageModule {}
