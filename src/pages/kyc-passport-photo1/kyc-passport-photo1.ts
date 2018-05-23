import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Platform ,LoadingController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageViewerController } from 'ionic-img-viewer';
import { KycPassportPhoto2Page } from '../kyc-passport-photo2/kyc-passport-photo2';
/**
 * Generated class for the KycPassportPhoto1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kyc-passport-photo1',
  templateUrl: 'kyc-passport-photo1.html',
})
export class KycPassportPhoto1Page {
  base64Image = "assets/imgs/p1.png"
  input = new FormData();
  credentials;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public camera: Camera,
    public platform: Platform,
    private loadingCtrl: LoadingController,) {
      this.credentials = this.navParams.data.credentials
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KycPassportPhoto1Page');
  }
  takePhoto() {
    console.log('take photo ....');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    if (this.platform.is('cordova')) {
      this.camera.getPicture(options).then(
        imageData => {
          let loading = this.loadingCtrl.create({
            spinner: 'circles',
            content: 'Uploading...',
            duration: 3500
          });
          loading.present();
          const filename = Math.floor(Date.now() / 1000);
          this.base64Image = 'data:image/jpeg;base64,' + imageData;
          loading.dismiss();
          this.input.append("photo1",this.base64Image)
        },
        err => {
          console.log('Error taking photo', JSON.stringify(err));
        }
      );
    }
  }

  next(){
    this.navCtrl.push(KycPassportPhoto2Page,{input:this.input , credentials : this.credentials})
  }
}
