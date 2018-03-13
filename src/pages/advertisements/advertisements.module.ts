import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdvertisementsPage } from './advertisements';
import { MePageModule } from '../me/me.module';

@NgModule({
  declarations: [
    AdvertisementsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdvertisementsPage),
    MePageModule
  ],
})
export class AdvertisementsPageModule {}
