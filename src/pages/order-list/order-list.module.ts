import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderListPage } from './order-list';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OrderListPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderListPage),
    TranslateModule.forChild()
  ],
})
export class OrderListPageModule {}
