import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoogleAuthInputPage } from './google-auth-input';

@NgModule({
  declarations: [
    GoogleAuthInputPage,
  ],
  imports: [
    IonicPageModule.forChild(GoogleAuthInputPage),
  ],
})
export class GoogleAuthInputPageModule {}
