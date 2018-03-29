import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthPage } from './auth';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AuthPage],
  imports: [
    IonicPageModule.forChild(AuthPage),
    RouterModule,
    TranslateModule.forChild()
  ]
})
export class AuthPageModule {}
