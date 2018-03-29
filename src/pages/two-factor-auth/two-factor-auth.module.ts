import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TwoFactorAuthPage } from './two-factor-auth';

@NgModule({
  declarations: [
    TwoFactorAuthPage,
  ],
  imports: [
    IonicPageModule.forChild(TwoFactorAuthPage),
  ],
})
export class TwoFactorAuthPageModule {}
