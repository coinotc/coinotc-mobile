import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PincodePage } from './pincode';

@NgModule({
  declarations: [
    PincodePage,
  ],
  imports: [
    IonicPageModule.forChild(PincodePage),
  ],
})
export class PincodePageModule {}
