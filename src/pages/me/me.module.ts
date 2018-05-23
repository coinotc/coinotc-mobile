import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MePage } from './me';
import { TextAvatarDirective } from '../../directives/text-avatar/text-avatar';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MePage, TextAvatarDirective],
  imports: [IonicPageModule.forChild(MePage), TranslateModule.forChild()],
  exports: [TextAvatarDirective]
})
export class MePageModule {}
