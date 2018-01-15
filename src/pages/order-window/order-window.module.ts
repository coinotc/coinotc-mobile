import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderWindowPage } from './order-window';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OrderWindowPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderWindowPage),
    TranslateModule.forChild()
  ],
})
export class OrderWindowPageModule {}
