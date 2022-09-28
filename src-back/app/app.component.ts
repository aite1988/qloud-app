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
  appVersion:any="1.2.4";
  link_google_store="";

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public authService: ApiServiceProvider,public alertCtrl:AlertController
    ,public fcm:FCM) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();


      
//check version
this.authService.postData("", "/appApi/appVersionControl").then((result) =>{
  this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData
console.log(this.resposeData.appVersion.app_version);
console.log(this.appVersion);
  if((this.appVersion!=this.resposeData.appVersion.app_version)&&(platform.is('android')))
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
 
            window.open('https://play.google.com/store/apps/details?id=com.checker.meecapital');
   
          }
        }
      ]
    });
    alert.present();
  }


  }, (err) => {

  });
      

      if(localStorage.getItem("userData"))
    {
      
      this.rootPage=TabsPage; 

    }
    else{
      this.rootPage=LoginPage;

        }
    });
  }

  screenWidth()
  {
    
    //console.log(window.innerWidth);
    if(window.innerWidth>500)
    {
      return {"width":"70%",left:"15%"};

    }
    else
    {
      return {"width":"100%"};
    }

  }
}

