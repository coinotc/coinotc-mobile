
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MePage } from './me';
import { TextAvatarDirective } from '../../directives/text-avatar/text-avatar';

@NgModule({
  declarations: [
    MePage,
    TextAvatarDirective
    
  ],
  imports: [
    IonicPageModule.forChild(MePage),
    
  ],
  exports: [TextAvatarDirective]
})
export class MePageModule {}
