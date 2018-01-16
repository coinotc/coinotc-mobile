import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddadvertisementPage } from './addadvertisement';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddadvertisementPage,
  ],
  imports: [
    IonicPageModule.forChild(AddadvertisementPage),
    TranslateModule.forChild()
  ],
})
export class AddadvertisementPageModule {}
