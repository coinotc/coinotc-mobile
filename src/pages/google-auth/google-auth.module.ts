import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoogleAuthPage } from './google-auth';

@NgModule({
  declarations: [
    GoogleAuthPage,
  ],
  imports: [
    IonicPageModule.forChild(GoogleAuthPage),
  ],
})
export class GoogleAuthPageModule {}
