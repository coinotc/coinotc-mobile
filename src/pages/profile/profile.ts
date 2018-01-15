import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JwtServiceProvider } from '../../providers/jwt-service/jwt-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ProfileServiceProvider } from '../../providers/profile-service/profile-service';
import { Observable } from 'rxjs/Observable';
import { Profile } from "../../models/profile.model";
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  placeholderPicture = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515005723652&di=a1ebb7c0a1b6bfede1ff5ebc057ed073&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D822b27e7b8fb43160e12723948cd2c56%2F6c224f4a20a44623b6b1e24e9222720e0cf3d7a7.jpg';
  private profile: Observable<Profile>;
  model =  new Profile(null,null,"");
  rate;
  profileUser;
  items = [
    'Pokémon Yellow',
    'Super Metroid',
    'Mega Man X',
    'The Legend of Zelda',
    'Pac-Man',
    'Super Mario World',
    'Street Fighter II',
    'Half Life',
    'Final Fantasy VII',
    'Star Fox',
    'Tetris',
    'Donkey Kong III',
    'GoldenEye 007',
    'Doom',
    'Fallout',
    'GTA',
    'Halo'
  ];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private jwtService:JwtServiceProvider,
    private userService:UserServiceProvider,
    private profileService:ProfileServiceProvider
  ) {
    let currentUserName = this.userService.getCurrentUser().username;
    this.profileUser = navParams.data;
    this.profile = this.profileService.getProfile(this.profileUser);
    this.profile.subscribe(result=>{
      this.model = result[0];
      if(this.model.orderCount == 0){
        this.rate = 0;
      }else{
        this.rate = this.model.goodCount / this.model.orderCount;
      }
    })
    
  }

  block(){}
  trust(){}
  


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
