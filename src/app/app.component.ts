import { Component, ViewChild } from '@angular/core';
import { AlertController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Deeplinks } from '@ionic-native/deeplinks';


import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { FCM } from '@ionic-native/fcm';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { GetProvinceData } from '../providers/province-data';
import { HomePage } from '../pages/home/home';
import { HomeFavPage } from '../pages/home-fav/home-fav';
import { ProfilePage } from '../pages/profile/profile';
import { CalculatorPage } from '../pages/calculator/calculator';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;

  //pages: Array<{ title: string, component: any, leftIcon: string }>;
pages:any;
  resposeData:any;
  appVersion:any="1.0.11";
  link_google_store="";
plt:any='';
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public authService: ApiServiceProvider,public alertCtrl:AlertController
    ,public fcm:FCM
    ,public getProvinceData:GetProvinceData
    , public translateService: TranslateService,
    private deeplinks: Deeplinks,
    public http: HttpClient) {
          // Default Language

        
    translateService.setDefaultLang('en');
    platform.ready().then(() => {

      this.deeplinks.route({
        '/calculator': CalculatorPage,
      }).subscribe(match => {
        // match.$route - the route we matched, which is the matched entry from the arguments to route()
        // match.$args - the args passed in the link
        // match.$link - the full link data
        console.log('Successfully matched route', match);
      }, nomatch => {
        // nomatch.$link - the full link data
        console.error('Got a deeplink that didn\'t match', nomatch);
      });

      this.fcm.subscribeToTopic('qloudapp');
     // statusBar.styleDefault();
      statusBar.backgroundColorByHexString('#11bada');
      splashScreen.hide();
      this.getSidebarList();
      let homeApp=localStorage.getItem("homeApp");
      let isHome=JSON.parse(localStorage.getItem("isHome"));
      if(isHome==true)
      {

        let isLastestApp=JSON.parse(localStorage.getItem("lastest_app"));
        if(isLastestApp)
        {
          
          this.nav.setRoot(isLastestApp.page,{item:isLastestApp});

        }
        else
        {
          this.rootPage=HomePage; 
        }

 
      }
      else if(isHome==0)
      {


          this.rootPage=HomePage;
        

      }
      else

      {
        localStorage.setItem("isHome","true");
        this.rootPage=HomePage;
      }


      
//check version
this.authService.postData("", "/appApi/getVersion").then((result) =>{
  this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData
console.log(this.resposeData.appData.ios);
localStorage.setItem('app_state',this.resposeData.appData.state);
if(platform.is('ios'))
{
  localStorage.setItem('platform','ios');
  this.plt="ios";

  if((this.appVersion!=this.resposeData.appData.ios))
  {
    let alert = this.alertCtrl.create({
      mode:this.plt,
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
 
            window.open('https://apps.apple.com/us/app/qloud-app/id1638576564');
   
          }
        }
      ]
    });
    alert.present();
  }
}
else
{
  localStorage.setItem('platform','md');
  this.plt="md";

  if((this.appVersion!=this.resposeData.appData.android))
  {
    let alert = this.alertCtrl.create({
      mode:this.plt,
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
 
            window.open('https://play.google.com/store/apps/details?id=com.qloud.app');
   
          }
        }
      ]
    });
    alert.present();
  }
}



  }, (err) => {

  });
      

  


    });
  }

  getSidebarList() {
    this.http.get('assets/i18n/en.json').subscribe((data: any) => {
      this.pages = data.SIDEBAR_List;

    }, error => {
      console.error(error);
    });
  }

  openHomeApp()
  {
    if(!localStorage.getItem("homeApp"))
    {
      let alert = this.alertCtrl.create({
        title: 'คุณยังไม่ได้ตั้งค่าโฮมแอพฯ',
        message: '',
        buttons: ['Ok']
      });
      alert.present();
    }
    else
    {
      this.nav.setRoot(localStorage.getItem("homeApp"));
    }

  }
  cancelHomeApp()
  {
   localStorage.setItem("homeApp","");
   let alert = this.alertCtrl.create({
    title: 'ยกเลิกโฮมแอพสำเร็จ',
    message: '',
    buttons: ['Ok']
  });
  alert.present();
  }
  openSetting()
  {
    this.nav.push(ProfilePage);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page);
  }
}

