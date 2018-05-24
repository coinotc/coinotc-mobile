import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradePage } from './trade';
import { fiatPopoverPage } from './trade';
import { TranslateModule } from '@ngx-translate/core';
import { MePageModule } from '../me/me.module';
import { SearchPipe } from './trade';
@NgModule({
  declarations: [TradePage, fiatPopoverPage, SearchPipe],
  imports: [
    IonicPageModule.forChild(TradePage),
    TranslateModule.forChild(),
    MePageModule,
    SearchPipe
  ]
})
export class TradePageModule {}
