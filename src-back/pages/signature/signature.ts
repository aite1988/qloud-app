
import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage,NavController, Platform, Content, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html'
})
export class SignaturePage {
  // Canvas stuff
  @ViewChild('imageCanvas') canvas: any;
  @ViewChild('fixedContainer') fixedContainer: any;
  canvasElement: any;
 
  saveX: number;
  saveY: number;
 
  storedImages = [];
  lineWeight=3;
img = new Image();



  // Make Canvas sticky at the top stuff
  @ViewChild(Content) content: Content;
 
  // Color Stuff
  selectedColor = '#4250ad';
 
  colors = [ '#9e2956', '#c2281d', '#de722f', '#edbf4c', '#5db37e', '#459cde', '#4250ad', '#802fa3','#ffffff' ];
 
  constructor(public navCtrl: NavController, public renderer: Renderer, private platform: Platform
    ,private alertCtrl:AlertController) {
    // Load all stored images when the app is ready

  }
 
  ionViewDidEnter() {
    // https://github.com/ionic-team/ionic/issues/9071#issuecomment-362920591
    // Get the height of the fixed item

  }

  ionVIewWillEnter()
  {
    this.disableConfirmExit();
  }

  ionVIewWillLeave()
  {
    this.restoreConfirmExit();
  }
 
  ionViewDidLoad() {
    // Set the Canvas Element and its size
    this.canvasElement = this.canvas.nativeElement;
 
    this.canvasElement.width = this.platform.width();
    this.canvasElement.height =  300;
    //image background
    const context = this.canvasElement.getContext('2d');
  }
selectColor(color) {
  //console.log(color);
  this.selectedColor = color;
  if(this.selectedColor=='#ffffff')
  {
    this.lineWeight=8;
  }
  else
  {
    this.lineWeight=3;
  }
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
  ctx.strokeStyle = this.selectedColor;
  ctx.lineWidth = this.lineWeight;
 
  ctx.beginPath();


  ctx.moveTo(this.saveX, this.saveY);
  ctx.lineTo(currentX, currentY);
  ctx.closePath();
 
  ctx.stroke();
 
  this.saveX = currentX;
  this.saveY = currentY;
}
 
 

saveCanvasImage() {

  var dataUrl = this.canvasElement.toDataURL();
  localStorage.setItem('signature',dataUrl);
  console.log(dataUrl);
  let ctx = this.canvasElement.getContext('2d');
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
  console.log("save image");

  this.navCtrl.pop();
}

 
// https://forum.ionicframework.com/t/save-base64-encoded-image-to-specific-filepath/96180/3


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
        title: 'ออกจากแอพ คุณจะไม่ได้รับงานจากระบบ',
        message: 'คุณต้องการออกหรือไม่?',
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