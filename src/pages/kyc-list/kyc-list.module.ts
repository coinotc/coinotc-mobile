import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KycListPage } from './kyc-list';

@NgModule({
  declarations: [
    KycListPage,
  ],
  imports: [
    IonicPageModule.forChild(KycListPage),
  ],
})
export class KycListPageModule {}
