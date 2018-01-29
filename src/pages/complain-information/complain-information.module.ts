import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplainInformationPage } from './complain-information';

@NgModule({
  declarations: [
    ComplainInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(ComplainInformationPage),
  ],
})
export class ComplainInformationPageModule {}
