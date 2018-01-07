import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdvertisementsPage } from './advertisements';
import { SuperTabsModule } from 'ionic2-super-tabs';


@NgModule({
  declarations: [
    AdvertisementsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdvertisementsPage),
    SuperTabsModule
  ],
})
export class AdvertisementsPageModule {}
