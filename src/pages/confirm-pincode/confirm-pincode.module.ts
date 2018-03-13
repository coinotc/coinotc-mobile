import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmPincodePage } from './confirm-pincode';

@NgModule({
  declarations: [
    ConfirmPincodePage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmPincodePage),
  ],
})
export class ConfirmPincodePageModule {}
