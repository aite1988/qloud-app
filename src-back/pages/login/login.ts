import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,AlertController,LoadingController,PopoverController, Content } from 'ionic-angular';

// นำเข้า api-service
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { TabsPage } from '../tabs/tabs';
import { FCM } from '@ionic-native/fcm';


// นำเข้าหน้าแรก
//import { HomePage } from '../home/home';

@IonicPage(
  
)
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

})

export class LoginPage {

  @ViewChild(Content) content: Content;
  resposeData : any;  // ประกาศตัวแปรรับข้อมูล
  url="https://taxi-delivery.com/api-carmoney";
  userData = {username:"", password:"",token:""}; // ตัวแปรสำหรับเข้าสู่ระบบ
  loginDat:any;
  state="welcome";
  token:any="";
  resId:any="";
  config: {
    // These options are available in ionic-angular@2.0.0-beta.2 and up.
    scrollAssist: false,    // Valid options appear to be [true, false]
    autoFocusAssist: false  // Valid options appear to be ['instant', 'delay', false]
  }
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public authService: ApiServiceProvider,private toastCtrl:ToastController,public alerCtrl: AlertController,public loadingCtrl: LoadingController
    ,public popoverCtrl: PopoverController
    ,public fcm:FCM) {
      localStorage.clear();
      this.token=this.tokenGenerator();

      console.log(this.token);
  }


  nextstate()
  {
    this.state="login";
  }


  ionViewDidLoad() {
   /* this.loginDat= JSON.parse(localStorage.getItem("userData"));
    if(this.loginDat)
    {
      this.navCtrl.setRoot(TabsPage);

    }
    console.log('ionViewDidLoad LoginPage');  */
  }

  presentToastSuccess() {
    this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000,
      position: 'top'
    });
  }



  login(){
   //console.log(this.userData);


    if(this.userData.username && this.userData.password){ // ต้องกรอกชื่อผู้ใช้และรหัสผ่าน
     // ส่งข้อมูลแบบ post เรียกใช้ฟังก์ชัน login ของ api slim
     this.userData.token=this.token;
     this.authService.postData(this.userData, "/checkerApi/checkerlogin").then((result) =>{
     this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData
      console.log(this.resposeData);
     if(this.resposeData.checkerData!=""){ // ถ้าข้อมูลถูกต้อง

      this.fcm.subscribeToTopic(this.resposeData.checkerData.username);
      this.fcm.subscribeToTopic('all-checker');


      localStorage.setItem('userData', JSON.stringify(this.resposeData))
      localStorage.setItem('token',this.token);
      if(this.resposeData.checkerData.checker_photo)
      {
        localStorage.setItem('checker-photo',this.url+this.resposeData.checkerData.checker_photo);
      }


        let loading = this.loadingCtrl.create({
          spinner: 'circles',
          content: 'กรุณารอสักครู่...'
        });
        loading.present();

      
       this.navCtrl.setRoot(TabsPage,{},{ animate: true, animation: 'ios-transition ',direction:'forward' ,duration: 1000 });
         //this.navCtrl.setRoot(AdsPage,{ref_page_id:page_id,state:"none"},{ animate: true, animation: 'ios-transition ',direction:'forward' ,duration: 1000 });
       // location.reload();
       location.replace("");
        loading.dismiss();
//this.alert();
      
      // this.navCtrl.setRoot(HomePage)
     }else{
       console.log("โปรดระบุชื่อผู้ใช้และรหัสผ่านที่ถูกต้อง");
       this.presentToast("โปรดระบุชื่อผู้ใช้และรหัสผ่านที่ถูกต้อง");
      }
     }, (err) => {
       this.presentToast(err); // ถ้าเกิดข้อผิดพลาดให้แสดงข้อความ
     });
    }
    else{
     this.presentToast("ใส่ชื่อผู้ใช้และรหัสผ่าน");
    }
   }

 

   // ฟังก์ชัน Toast แจ้งเตือน
   presentToast(msg) {
     let toast = this.toastCtrl.create({
       message: msg,
       duration: 2000,
       position: 'top',
       cssClass: "text-center",
     });
     toast.present();
   }


  tokenGenerator() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 40; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 scrollToBottom() {
   console.log("scroll bottom");
  setTimeout(() => {

        this.content.scrollToBottom();
    
  },400)
}

gotoRegister()
{
  this.navCtrl.push("RegisterPage");
}

}


