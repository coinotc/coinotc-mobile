import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplainInformationPage } from './complain-information';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ComplainInformationPage],
  imports: [
    IonicPageModule.forChild(ComplainInformationPage),
    TranslateModule.forChild()
  ]
})
export class ComplainInformationPageModule {}
