import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController, AlertController ,LoadingController,ViewController,ToastController,NavParams} from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
// นำเข้า api-service
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { AngularCropperjsComponent} from 'angular-cropperjs';


@Component({
  selector: 'page-photo-edit',
  templateUrl: 'photo-edit.html'
})
export class PhotoEditPage {
  @ViewChild('angularCropper') public angularCropper: AngularCropperjsComponent;
  cropperOptions: any;
  croppedImage = null;
  ratioSelect="0.5";
  myImage = null;
  scaleValX = 1;
  scaleValY = 1;
  crop_windows="no";
  url="https://taxi-delivery.com/api-carmoney";
  imageURI:any;
imageFileName:any;
imgBase64:any;
image_name:any;
image_type:any;
image_size:any;
getImageData:any;
intervalTime:any;
percent=0;
@ViewChild('file') file:ElementRef;
preview:any;

photo:any;
username:any;

    //กำหนดตัวแปร
  public resposeData: any;
  public dataSet: any;
  public ldtDataSet: any;
  public ldtJson: any;
  public search_query: any;

  userPostData = {user_id:"",search_ldt:""};


  constructor(public navCtrl: NavController,public authService: ApiServiceProvider,

    private alertCtrl: AlertController,public loadingCtrl: LoadingController,public alerCtrl: AlertController
    ,public viewCtrl: ViewController
    ,public navParams: NavParams
    ,public platform: Platform
    ,private toastCtrl:ToastController
    ,private camera: Camera) {
      this.username=JSON.parse(localStorage.getItem("userData")).checkerData.username;
   console.log(this.username);
  }

  ionViewWillEnter(){

    this.disableConfirmExit();

    this.cropperOptions = {
      dragMode: 'move',
      ImageSmoothingQuality:'High',
      aspectRatio: 1,
      modal: true,
      autoCrop: true,
      movable: true,
      zoomable: true,
      scalable: true,
      autoCropArea: 0.8,
    };
    if(localStorage.getItem("checker-photo"))
    {
      this.preview=localStorage.getItem("checker-photo");
    }
    else
    {
      this.preview="./assets/imgs/profile.jpg";
    }

  }

  refresh(event) {

    setTimeout(() => {
      console.log('Async operation has ended');
      event.complete();
    }, 200);
  }




ionViewDidLoad() {

}




onClickBtn(){

  this.file.nativeElement.click();
  console.log(this.file);

}

onFileChange(){
  this.crop_windows="yes";
  let reader = new FileReader();
  this.preview='';
  reader.onload=(readerEvent)=>{
  this.imgBase64=(readerEvent.target as any).result; 
  this.upload();
  }
  reader.readAsDataURL(this.file.nativeElement.files[0]);
  this.image_name=this.file.nativeElement.files[0].name;
  this.image_type=this.file.nativeElement.files[0].type;
  this.image_size=this.file.nativeElement.files[0].size;
console.log(this.file.nativeElement);
  this.file.nativeElement.value='';

  }



getImage() {
  this.crop_windows="yes";

  const options: CameraOptions = {
   // cameraDirection: this.camera.Direction.FRONT,  //front camera
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType:this.camera.EncodingType.JPEG,
    mediaType:this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then(imageData => {
    this.getImageData = 'data:image/jpeg;base64,'+imageData;
    this.image_type="image/jpeg";
    this.imgBase64=this.getImageData; 
    this.image_size=10000;
this.upload();
  }, (err) => {
    console.log(err);
    this.presentToast(err);
  });
}

upload()
{ let quata=15000000;
  let alert = this.alertCtrl.create({
    title: "ไฟล์พบข้อผิดพลาด",
    message: "ไฟล์ไม่รองรับหรือมีขนาดใหญ่กว่า 15MB",
    buttons: ['Ok']}
      );

console.log(this.image_type);
console.log(this.image_size/100000);
//this.preview=this.imgBase64;

 
}




selectImage(){
 
}


  //crop function
  reset() {
    this.angularCropper.cropper.reset();
  }

  clear() {
    this.angularCropper.cropper.clear();
  }
  
  rotate() {
    this.angularCropper.cropper.rotate(90);
  }
  
  zoom(zoomIn: boolean) {
    let factor = zoomIn ? 0.1 : -0.1;
    this.angularCropper.cropper.zoom(factor);
  }
  
  scaleX() {
    this.scaleValX = this.scaleValX * -1;
    this.angularCropper.cropper.scaleX(this.scaleValX);
    
  }
  
  scaleY() {
    this.scaleValY = this.scaleValY * -1;
    this.angularCropper.cropper.scaleY(this.scaleValY);
  }
  
  move(x, y){
    this.angularCropper.cropper.move(x, y);
  }
  
  cropPhoto() {
    let croppedImgB64String: string = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg', (20/ 100));
    this.croppedImage = croppedImgB64String;
  //console.log(this.croppedImage);
  this.preview=this.croppedImage;
  this.imgBase64="";
  this.crop_windows="no";
  this.photo=this.preview;
  }
  

  cancelCrop()
  {
    this.imgBase64="";
    this.crop_windows="no";
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  
  percentToast(msg) {
    let toast = this.toastCtrl.create({
      position:"middle",
      message: msg,
      duration: 5000,
      dismissOnPageChange:true
    });
    toast.present();
  }

  uploadProgress(filesize){
    let time=filesize/100000;
    let alert = this.alertCtrl.create({
      title: "กรุณารอสักครู่<br>File size : "+(filesize/1000000)+" MB",
      message: this.percent.toString(),
      buttons: ['Ok']}
        );
     alert.present();
    this.intervalTime = setInterval(() => { 


      console.log("fetch ads status from ads_page"); // Now the "this" still references the component
if(this.percent<100)
{

      alert.setMessage("progress...."+this.percent.toString()+"  %");


  this.percent+=1;

}
else{
  alert.setMessage("อัพโหลดเรียบร้อยแล้ว");
  clearInterval(this.intervalTime);
}
console.log(this.percent);

//ตั้งเวลาทุกๆ 60 วินาที
   }, time);

  }


  uploadPhoto()
{

  
  let loading = this.loadingCtrl.create({
    spinner: 'circles',
    content: 'กรุณารอสักครู่...',
    cssClass: 'my-loading-class'
  });
  loading.present();


  let postDat={username:this.username,photo:this.photo,photo_type:"image/jpeg"}
  console.log(postDat);
    this.authService.postData(postDat,'/checkerApi/checkerUpdatePhoto').then((result) => {
      this.resposeData=result;
      
      console.log(result);
        if(this.resposeData.result==='success')
        {

     // alert.present();
     
      localStorage.setItem("checker-photo",this.url+this.resposeData.photo_path);
      this.navCtrl.pop();
      location.reload();
        }
        else
        {
          this.presentToast("ระบบมีปัญหา");
        }
        loading.dismiss();
    }, (err) => {

     this.navCtrl.pop();
     loading.dismiss();
    });

}

ionViewWillLeave()
{
 this.restoreConfirmExit();
}


disableConfirmExit(){
  this.platform.registerBackButtonAction(() => {

  this.navCtrl.pop(); 
  
}, 0)
}

restoreConfirmExit(){
  var alertShown:boolean = false;
  this.platform.registerBackButtonAction(() => {
    if (alertShown==false) {
      let alert = this.alertCtrl.create({
        title: 'คุณต้องการออกหรือไม่? ',
        message: 'ออกจากแอพ คุณจะไม่ได้รับงานจากระบบ',
        buttons: [
          {
            text: 'ยกเลิก',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
              alertShown=false;
            }
          },
          {
            text: 'ตกลง',
            handler: () => {
              console.log('Yes clicked');
   
              this.platform.exitApp();
     
            }
          }
        ]
      });
       alert.present().then(()=>{
        alertShown=true;
      });
    }
  }, 0)

}


















}
