import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdvertisementsPage } from './advertisements';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { MePageModule } from '../me/me.module';

@NgModule({
  declarations: [
    AdvertisementsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdvertisementsPage),
    SuperTabsModule,
    MePageModule
  ],
})
export class AdvertisementsPageModule {}
