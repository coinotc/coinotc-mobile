import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplainPage } from './complain';

@NgModule({
  declarations: [
    ComplainPage,
  ],
  imports: [
    IonicPageModule.forChild(ComplainPage),
  ],
})
export class ComplainPageModule {}
