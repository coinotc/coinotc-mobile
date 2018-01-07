import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BindPhonePage } from './bind-phone';

@NgModule({
  declarations: [
    BindPhonePage,
  ],
  imports: [
    IonicPageModule.forChild(BindPhonePage),
  ],
})
export class BindPhonePageModule {}
