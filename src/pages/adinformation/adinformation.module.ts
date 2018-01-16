import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdinformationPage } from './adinformation';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AdinformationPage,
  ],
  imports: [
    IonicPageModule.forChild(AdinformationPage),
    TranslateModule.forChild()
  ],
})
export class AdinformationPageModule {}
