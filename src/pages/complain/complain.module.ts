import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplainPage } from './complain';
import { MePageModule } from '../me/me.module';
@NgModule({
  declarations: [
    ComplainPage,
  ],
  imports: [
    IonicPageModule.forChild(ComplainPage),
    MePageModule
  ],
})
export class ComplainPageModule {}
