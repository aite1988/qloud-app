import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { FCM } from '@ionic-native/fcm';
import { ApiServiceProvider } from '../providers/api-service/api-service';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  resposeData:any;
  appVersion:any="1.0.12";
  link_google_store="";

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public authService: ApiServiceProvider,public alertCtrl:AlertController) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();
//check version
this.authService.postData("", "appVersionControl").then((result) =>{
  this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData
console.log(this.resposeData.appVersion.app_version);
console.log(this.appVersion);
  if(this.appVersion!=this.resposeData.appVersion.app_version)
  {
    let alert = this.alertCtrl.create({
      title: 'แอพต้องทำการอัพเดท',
      message: 'คุณต้องอัพเดทหรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
       
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            console.log('Yes clicked');
 
            window.open('https://play.google.com/store/apps/details?id=com.taxi.delivery');
   
          }
        }
      ]
    });
    alert.present();
  }


  }, (err) => {

  });
      

      if(localStorage.getItem("taxi-userData"))
    {
      
      this.rootPage=TabsPage; 

    }
    else{
      this.rootPage=LoginPage;

        }
    });
  }
}

