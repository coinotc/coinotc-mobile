import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyPasswordPage } from './modify-password';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ModifyPasswordPage],
  imports: [
    IonicPageModule.forChild(ModifyPasswordPage),
    TranslateModule.forChild()
  ]
})
export class ModifyPasswordPageModule {}
