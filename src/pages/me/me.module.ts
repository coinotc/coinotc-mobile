import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MePage } from './me';
import { IonTextAvatar } from 'ionic-text-avatar';

@NgModule({
  declarations: [
    MePage,
    IonTextAvatar
  ],
  imports: [
    IonicPageModule.forChild(MePage),
  ],
})
export class MePageModule {}
