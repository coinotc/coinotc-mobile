import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradeBuyCardanoPage } from './trade-buy-cardano';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TradeBuyCardanoPage,
  ],
  imports: [
    IonicPageModule.forChild(TradeBuyCardanoPage),
    TranslateModule.forChild()
  ],
})
export class TradeBuyCardanoPageModule {}
