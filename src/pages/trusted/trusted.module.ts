import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrustedPage } from './trusted';
import { MePageModule } from '../me/me.module';
@NgModule({
  declarations: [
    TrustedPage,
  ],
  imports: [
    IonicPageModule.forChild(TrustedPage),
    MePageModule
  ],
})
export class TrustedPageModule {}
