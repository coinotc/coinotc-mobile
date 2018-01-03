import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderWindowPage } from './order-window';

@NgModule({
  declarations: [
    OrderWindowPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderWindowPage),
  ],
})
export class OrderWindowPageModule {}
