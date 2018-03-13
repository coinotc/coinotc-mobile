import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdinformationPage } from './adinformation';
import { TranslateModule } from '@ngx-translate/core';
import { MePageModule } from '../me/me.module';
@NgModule({
  declarations: [
    AdinformationPage,
  ],
  imports: [
    IonicPageModule.forChild(AdinformationPage),
    TranslateModule.forChild(),
    MePageModule
  ],
})
export class AdinformationPageModule {}
