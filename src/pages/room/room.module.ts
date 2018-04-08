import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomPage } from './room';
import { TranslateModule } from '@ngx-translate/core';
import { MePageModule } from '../me/me.module';
@NgModule({
  declarations: [
    RoomPage,
  ],
  imports: [
    IonicPageModule.forChild(RoomPage),
    TranslateModule.forChild(),
    MePageModule
  ],
})
export class RoomPageModule {}
