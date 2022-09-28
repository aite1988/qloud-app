import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams,AlertController,Platform, ModalController } from 'ionic-angular';
// นำเข้า api-service
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoEditPage } from '../photo-edit/photo-edit';
import { JobDetailPhotoPage } from '../job-detail-photo/job-detail-photo';
import { JobDetailAddMorePage } from '../job-detail-addmore/job-detail-addmore';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-job-detail',
  templateUrl: 'job-detail.html',
})
export class JobDetailPage {
  app_id:any="";
resposeData:any="";
jobDat:any="";
mapsShow:any="";
mapsDirection:any="";
stat:any="init";
status:any="";
status_new:any="";
signature:any="";
con_id:any;
storeId:any;
distance:any;
initLoading=true;
checker_id:any;
check_result:any=[];
mapsUrl:any;
cur_position:any;

show_popup=false;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private platform:Platform
    ,private alertCtrl:AlertController
    ,public modalCtrl:ModalController
    ,private iab: InAppBrowser
    ,public geolocation:Geolocation
    ,private callNumber: CallNumber
    ,public authService: ApiServiceProvider,private sanitizer: DomSanitizer) {
      this.checker_id=JSON.parse(localStorage.getItem('userData')).checkerData.username;


  }
  ionViewWillEnter()
  {

      this.getJobDetail();
    
    this.disableConfirmExit();
  }

  ionViewWillLeave()
  {
    this.restoreConfirmExit();
  }
  ionViewDidLoad() {

    console.log('ionViewDidLoad HomePage');
    this.app_id=this.navParams.get('app_id');


    console.log(this.app_id);


  }

  getJobDetail()
  {


    let postDat ={app_id:this.app_id};
    console.log(postDat);
    this.authService.postData(postDat, "/applyApi/appget").then((result) =>{
      this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData
      console.log(this.resposeData);
      setTimeout(()=>{
        this.initLoading=false;
    
         },500);
     
      if(this.resposeData.jobData!="null"){ // ถ้าข้อมูลถูกต้อง
        this.jobDat=this.resposeData.jobData;

        this.status=this.resposeData.jobData.status;

        if(this.status_new!=""&&(this.status!=this.status_new))
        {
          let alert = this.alertCtrl.create({
            title: 'ขออภัย',
            message: 'งานนี้มีคนอื่นรับงานแล้ว',
            buttons: ['ตกลง']
          });
       alert.present()
        }
        console.log(this.status);

  console.log(this.jobDat);

  let lat2=this.jobDat.appoint_latlng.split(",")[0];
  let long2=this.jobDat.appoint_latlng.split(",")[1];
  //this.distance=this.calculateDis(this.jobDat.cus_location,this.jobDat.store_location);
   //https://www.google.com/maps/dir/13.805598,100.485747/13.8365749,100.4452587/13.8095669,100.4210543
  let mapsUrl="https://maps.google.com/maps?q="+lat2+","+long2+"&t=&z=17&ie=UTF8&iwloc=&output=embed";
 
  console.log(mapsUrl);
    this.mapsShow=this.sanitizer.bypassSecurityTrustResourceUrl(mapsUrl);
    console.log(mapsUrl)

    this.geolocation.getCurrentPosition().then((resp) => {
      
       this.cur_position = resp.coords.latitude+","+resp.coords.longitude;


      let mapsDirection;
      //https://www.google.com/maps/dir/13.8059996,100.4870899/35%2F45+หมู่8+Green+Loft,+ซอยส.ภาณุรังษี+ตำบลบางกรวย+Bang+Kruai+District,+Nonthaburi+11130/@13.8042336,100.4865213,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x30e29bca6da66215:0x2cbc58e788ec9f6c!2m2!1d100.48871!2d13.8042284!3e0
      mapsDirection="https://www.google.com/maps/dir/"+this.cur_position+"/"+this.jobDat.appoint_latlng;
  //  this.mapsDirection = this.sanitizer.bypassSecurityTrustResourceUrl(mapsDirection);
  this.mapsUrl=mapsDirection;
  

      

  }).catch((error) => {
    console.log('Error getting location', error);
  });
  
      }else{}
      }, (err) => {

      });
  }


  confirmJob() {
    let alert = this.alertCtrl.create({
      title: '',
      message: 'คุณยืนยันหรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
     
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            console.log('Yes clicked');
            this.updateConfirmJob();
          }
        }
      ]
    });
     alert.present().then(()=>{

    });
  }

  updateConfirmJob()
  {


    let postDat ={app_id:this.app_id,checker_id:this.checker_id};
    console.log(postDat);

    this.authService.postData(postDat, "/applyApi/checkerAccept").then((result) =>{
      this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData
      console.log(result);

      if(this.resposeData.res=='success')
      {

         // this.navCtrl.pop();

          this.getJobDetail();
         

      }

     

      }, (err) => {


      });

    
  }


  confirmUpdate(stat) {
    let alert = this.alertCtrl.create({
      title: '',
      message: 'คุณยืนยันหรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
     
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            console.log('Yes clicked');
            this.updateJob(stat);
          }
        }
      ]
    });
     alert.present().then(()=>{

    });
  }

  
  gotoSignature()
  {
    this.navCtrl.push("SignaturePage");
  }

  updateJob(stat)
  {


    let postDat ={app_id:this.app_id,status:stat,checker_id:this.checker_id};
    console.log(postDat);

  

    if(stat=='สำเร็จ')
    {
     let alert = this.alertCtrl.create({
       title: 'กรุณาตรวจสอบ',
       message: 'ข้อมูลยังไม่ครบถ้วน',
       buttons: ['ตกลง']
     });
  alert.present()
    }
    else
    {
    this.authService.postData(postDat, "/applyApi/appupdateStatus").then((result) =>{
      this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData
      console.log(result);

      if(this.resposeData.res=='success')
      {

         // this.navCtrl.pop();

          this.status_new=stat;
          this.getJobDetail();
         

      }

     

      }, (err) => {


      });

    }
  }



  call(tel)
  {

    if(this.platform.is("ios"))
    {
      this.callNumber.callNumber(tel, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
    }
    else
    {
      window.open('tel:'+tel);
    }
   // console.log(tel[1]);
  

    
  }


  disableConfirmExit(){
    this.platform.registerBackButtonAction(() => {
      setTimeout(()=>{
        this.navCtrl.pop(); 
  
         },200);

    
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


  calculateDis(lat1long1,lat2long2)
  {


    let lat1=lat1long1.split(',')[0];
    let long1=lat1long1.split(',')[1];
    let lat2=lat2long2.split(',')[0];
    let long2=lat2long2.split(',')[1];


  let p = 0.017453292519943295;
  let c = Math.cos;
  let a = 0.5 - c((lat1 - lat2) * p) / 2
      + c(lat2 * p) * c((lat1) * p) * (1 - c(((long1 - long2) * p))) / 2;
  let dis = (12742 * Math.asin(Math.sqrt(a)))*1.5;
  //console.log("distance :"+dis);
  return dis;
  }

  gotoPhotoEdit()
  {
    this.navCtrl.push(JobDetailPhotoPage,{app_id:this.app_id});
  }


  gotoJobDetailAddMore()
  {
    this.navCtrl.push(JobDetailAddMorePage,{app_id:this.app_id});
  }

  gotoMapsView()
  {
    //this.navCtrl.push("MapsViewPage");
    
      console.log('ionViewDidLoad MapsViewPage');
      console.log(this.mapsUrl);
      const browser = this.iab.create(this.mapsUrl,'_system',{location:'yes', zoom:'no',footer:'no',hideurlbar:'yes',toolbarcolor:'#18679f',hidenavigationbuttons:'yes',closebuttoncolor:'white'}); 
    // const browser = this.iab.create("https://kapook.com",'_system',{location:'yes', zoom:'no',footer:'no',hideurlbar:'yes',toolbarcolor:'#18679f',hidenavigationbuttons:'yes',closebuttoncolor:'white'}); 
    
     browser.show();
 
  }

  presentPopup(popup_select) {
    this.show_popup=true;
    let profileModal = this.modalCtrl.create("PopupJobdetailPage", { popup_select: popup_select,app_id:this.app_id });
    profileModal.onDidDismiss(data => {
      this.show_popup=data.popup;
      this.disableConfirmExit();
      if(data.exit)
      {
        this.navCtrl.pop();
      }

    });
    profileModal.present();
  }
}
