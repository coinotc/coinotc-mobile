import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletDetailsPage } from './wallet-details';

@NgModule({
  declarations: [
    WalletDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(WalletDetailsPage),
  ],
})
export class WalletDetailsPageModule {}
