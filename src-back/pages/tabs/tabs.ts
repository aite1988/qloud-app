import { Component ,NgZone, ViewChild} from '@angular/core';
import { NavController,Platform ,AlertController, Tabs} from 'ionic-angular';
import { JobListPage } from '../job-list/job-list';
import { JobHistoryListPage } from '../job-history-list/job-history-list';
import { ProfilePage } from '../profile/profile';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundMode } from '@ionic-native/background-mode';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { HomePage } from '../home/home';
import { JobDetailPhotoPage } from '../job-detail-photo/job-detail-photo';
import { Badge } from '@ionic-native/badge';
import { LoginPage } from '../login/login';
import { FCM } from '@ionic-native/fcm';


@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  tab1Root = HomePage;
  tab3Root = ProfilePage;
  tab2Root = JobListPage;

  orderCount:any;
  messageCount:any;
  valueforngif=true;
  items:any;
  resId:any;
  role:any="";
  resposeData:any;
  position:any;
  con_id:any;
  jobTotal:any;
  intervalFetchOrder:any;

  gpsIntervalForeground:any;
  gpsIntervalBackground:any;
  is_alert:any=false;
  token:any;
  constructor(    public platform:Platform
    ,private geolocation: Geolocation
    ,private backgroundMode: BackgroundMode
    ,private alertCtrl:AlertController
    ,private navCtrl:NavController
    ,private badge: Badge
    ,private zone: NgZone
    ,private authService:ApiServiceProvider
    ,public fcm:FCM) {
      this.token=localStorage.getItem("token");
    
             
  }
  
  ionViewDidLoad() {

/*
    let alert = this.alertCtrl.create({
      title: 'ยินดีต้อนรับ',
      message: 'แอพมีเช็คเกอร์',
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            console.log('Yes clicked');
            setTimeout(() => {
 
              this.tabRef.select(1);
              }, 0);
          }
        }
      ]
    });
    alert.present();


  this.platform.resume.subscribe(() => {
    let alert = this.alertCtrl.create({
      title: 'คุณมีงานในระบบ',
      message: 'โปรดตรวจสอบ',
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            console.log('Yes clicked');
            setTimeout(() => {
 
              this.tabRef.select(1);
              }, 0);
     
          }
        }
      ]
    });
    alert.present();
});
    */

    this.platform.pause.subscribe(() => {
      this.backgroundEnable();

  
  });



      

this.restoreConfirmExit();



  }

  ionViewWillEnter()
{
 
  console.log("tabs page reload");


}

  ionViewWillLeave() {
  }


  disableConfirmExit(){
    this.platform.registerBackButtonAction(() => {

     // this.navCtrl.pop(); 
    
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
               this.backgroundEnable();
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


  backgroundEnable()
  {

   this.backgroundMode.enable();
    this.backgroundMode.setDefaults({ title: 'Your custom title', text: 'Your custom text', resume: true, hidden: false, silent: false });
  
    this.backgroundMode.overrideBackButton();
    this.backgroundMode.excludeFromTaskList();
    this.backgroundMode.moveToBackground();  //needs คำสั่งให้แอพพับไป
    this.backgroundMode.disableWebViewOptimizations();
    this.backgroundMode.moveToForeground(); //needs คำสั่งให้แอพไปรันใหม่บน background

/*
 this.backgroundMode.on('activate').subscribe(()=>
    {

  
    })
    

    this.backgroundMode.on('deactivate').subscribe(()=>
    {

    })
*/

  }


  playAlert()
  {
    var audio = new Audio('./assets/sound/alert.aac');
    this.is_alert=true;
    audio.play();
  }



}
