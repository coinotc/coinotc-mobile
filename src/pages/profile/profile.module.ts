
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { MePageModule } from '../me/me.module';

@NgModule({
  declarations: [
    ProfilePage,
    
  
   
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    MePageModule
    
  ],
})
export class ProfilePageModule {}
