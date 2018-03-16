import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomPage } from './room';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    RoomPage,
  ],
  imports: [
    IonicPageModule.forChild(RoomPage),
    TranslateModule.forChild()
  ],
})
export class RoomPageModule {}
