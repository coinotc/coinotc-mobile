import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrustedPage } from './trusted';

@NgModule({
  declarations: [
    TrustedPage,
  ],
  imports: [
    IonicPageModule.forChild(TrustedPage),
  ],
})
export class TrustedPageModule {}
