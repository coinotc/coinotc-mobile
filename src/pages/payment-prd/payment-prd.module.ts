import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentPrdPage } from './payment-prd';

@NgModule({
  declarations: [
    PaymentPrdPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentPrdPage),
  ],
})
export class PaymentPrdPageModule {}
