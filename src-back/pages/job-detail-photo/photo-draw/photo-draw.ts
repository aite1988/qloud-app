
import { Component, ViewChild, Renderer } from '@angular/core';
import { NavController, Platform, Content ,NavParams, ToastController, LoadingController} from 'ionic-angular';
import { ApiServiceProvider } from '../../../providers/api-service/api-service';
import { PhotoUploadEditPage } from '../photo-upload-edit/photo-upload-edit';



 
@Component({
  selector: 'page-photo-draw',
  templateUrl: 'photo-draw.html'
})
export class PhotoDrawPage {
  // Canvas stuff
  @ViewChild('imageCanvas') canvas: any;
  @ViewChild('imageCanvas2') canvas2: any;
  @ViewChild('imageCanvas3') canvas3: any;

  canvasElement: any;
  canvasElement2: any;
  canvasElement3: any;
 
  saveX: number;
  saveY: number;
  tooltype='draw';
  cardLink:any;
  storedImages = [];
  lineWeight=3;
img = new Image();
photodraw:any;
resposeData:any;

name:any;
app_id:any;
  // Make Canvas sticky at the top stuff
  @ViewChild(Content) content: Content;
 
  // Color Stuff
  selectedColor = '#9e2956';
 
  colors = [ '#061B00','#9e2956', '#c2281d', '#de722f', '#edbf4c', '#FDE600','#33EE01','#5db37e', '#00D8FF','#459cde','#4250ad','#FFA8DD','#FF00E4','#C900FF','#802fa3','#ffffff' ];
 
  constructor(public navCtrl: NavController, public renderer: Renderer, private plt: Platform,public navParams: NavParams
    ,public toastCtrl:ToastController
    ,public authService:ApiServiceProvider
    ,public loadingCtrl:LoadingController) {
    // Load all stored images when the app is ready
    this.photodraw=this.navParams.get('photo');
    this.name=this.navParams.get('name');
    this.app_id=this.navParams.get('app_id');
   // console.log(this.cardLink);
  }
 
  ionViewDidEnter() {
    // https://github.com/ionic-team/ionic/issues/9071#issuecomment-362920591
    // Get the height of the fixed item

  }
 
  ionViewDidLoad() {
    // Set the Canvas Element and its size
    this.canvasElement = this.canvas.nativeElement;
 
    this.canvasElement.width = this.plt.width();
    this.canvasElement.height = this.plt.width()/1.5;
    //image background
    this.canvasElement2 = this.canvas2.nativeElement;
    this.canvasElement2.width = this.plt.width();
    this.canvasElement2.height = this.plt.width()/1.5;

    this.canvasElement3 = this.canvas3.nativeElement;
    this.canvasElement3.width = this.plt.width();
    this.canvasElement3.height = this.plt.width()/1.5;


    const context = this.canvasElement2.getContext('2d');
    this.img.crossOrigin = 'anonymous';
    this.img.src = this.photodraw;
    this.img.onload = () => {
      context.drawImage(this.img, 0, 0,this.canvasElement2.width,this.canvasElement2.height);
    };
  }
  
selectColor(color) {
  //console.log(color);
  this.selectedColor = color;
  console.log(this.lineWeight);

}
 
startDrawing(ev) {
  var canvasPosition = this.canvasElement.getBoundingClientRect();
 
  this.saveX = ev.touches[0].pageX - canvasPosition.x;
  this.saveY = ev.touches[0].pageY - canvasPosition.y;
}
 
moved(ev) {
  var canvasPosition = this.canvasElement.getBoundingClientRect();
 
  let ctx = this.canvasElement.getContext('2d');
  let currentX = ev.touches[0].pageX - canvasPosition.x;
  let currentY = ev.touches[0].pageY - canvasPosition.y;
 
  ctx.lineJoin = 'round';

 
  ctx.beginPath();
  if(this.tooltype=='draw') {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = this.selectedColor;
    ctx.lineWidth = this.lineWeight;
} else {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 30;
}

  ctx.moveTo(this.saveX, this.saveY);
  ctx.lineTo(currentX, currentY);
  ctx.closePath();
 
  ctx.stroke();
 
  this.saveX = currentX;
  this.saveY = currentY;
}
 
 

saveCanvasImage() {
  this.canvasElement3 = this.canvas3.nativeElement;
  const context = this.canvasElement3.getContext('2d');
  context.drawImage(this.canvasElement2, 0, 0);
     context.drawImage(this.canvasElement, 0, 0);

  var dataUrl = this.canvasElement3.toDataURL('image/jpeg', 1.0);

// console.log(dataUrl);
  let ctx = this.canvasElement.getContext('2d');
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
  //console.log("save image");
  this.uploadPhoto(dataUrl);

}



eraser(){
  this.tooltype='eraser';
}

changeSize(size){
  this.lineWeight = size;
}

changeColour(color){
  this.tooltype='draw';
  this.selectedColor = color;
  console.log(this.tooltype);
}



uploadPhoto(photo)
{

  this.navCtrl.remove(3,3);
  let loading = this.loadingCtrl.create({
    spinner: 'circles',
    content: 'กรุณารอสักครู่...',
    cssClass: 'my-loading-class'
  });
  loading.present();


  let postDat={app_id:this.app_id,name:this.name,photo:photo,photo_type:"image/jpeg"}
  console.log(postDat);
    this.authService.postData(postDat,'/applyApi/appPhotoUpdate').then((result) => {
      this.resposeData=result;
      
      console.log(result);
        if(this.resposeData.result==='success')
        {
         
         this.navCtrl.pop();
        }
        else
        {
          this.presentToast("ระบบมีปัญหา");
        }
        loading.dismiss();
    }, (err) => {


     loading.dismiss();
    });

}

presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 2000
  });
  toast.present();
}


 
// https://forum.ionicframework.com/t/save-base64-encoded-image-to-specific-filepath/96180/3


 

}