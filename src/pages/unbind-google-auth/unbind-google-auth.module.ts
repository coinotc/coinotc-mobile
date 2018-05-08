import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnbindGoogleAuthPage } from './unbind-google-auth';

@NgModule({
  declarations: [
    UnbindGoogleAuthPage,
  ],
  imports: [
    IonicPageModule.forChild(UnbindGoogleAuthPage),
  ],
})
export class UnbindGoogleAuthPageModule {}
