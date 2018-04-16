import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendMailPage } from './send-mail';

@NgModule({
  declarations: [
    SendMailPage,
  ],
  imports: [
    IonicPageModule.forChild(SendMailPage),
  ],
})
export class SendMailPageModule {}
