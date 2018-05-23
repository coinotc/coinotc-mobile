import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Platform ,LoadingController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageViewerController } from 'ionic-img-viewer';
import { KycServiceProvider } from '../../providers/kyc-service/kyc-service';
/**
 * Generated class for the KycPassportPhoto2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kyc-passport-photo2',
  templateUrl: 'kyc-passport-photo2.html',
})
export class KycPassportPhoto2Page {
  base64Image = "assets/imgs/p2.png"
  input = new FormData();
  credentials;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public camera: Camera,
    public platform: Platform,
    private loadingCtrl: LoadingController,
    public kycService:KycServiceProvider) {
      this.input = this.navParams.data.input.get("photo1");
      this.credentials = this.navParams.data.credentials
      //console.log(this.base64Image)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KycPassportPhoto2Page');
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
          //let input = new FormData();
          this.input.append("photo2",this.base64Image)
        },
        err => {
          console.log('Error taking photo', JSON.stringify(err));
        }
      );
    }
  }
  next(){
    this.kycService.submitKYC( this.credentials , this.input).subscribe(result=>{
      
    })
  }
}
