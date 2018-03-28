import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlertPage } from './alert';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AlertPage],
  imports: [IonicPageModule.forChild(AlertPage), TranslateModule.forChild()]
})
export class AlertPageModule {}
