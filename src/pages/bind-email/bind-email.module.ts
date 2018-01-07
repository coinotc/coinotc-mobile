import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BindEmailPage } from './bind-email';

@NgModule({
  declarations: [
    BindEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(BindEmailPage),
  ],
})
export class BindEmailPageModule {}
