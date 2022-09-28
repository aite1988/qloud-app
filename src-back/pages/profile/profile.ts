import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, AlertController, Content, Platform, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
// นำเข้า api-service
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { FCM } from '@ionic-native/fcm';
import { PhotoEditPage } from '../photo-edit/photo-edit';
import { DomSanitizer } from '@angular/platform-browser';
import { JobHistoryListPage } from '../job-history-list/job-history-list';
import { ConfirmExit } from '../../providers/confirm-exit';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  @ViewChild(Content) content: Content;
  headerShow:any;
  initLoading=true;
  show_popup=false;
  popup_top=200;
  popup_top_before=0;
  popup_select:any;
  
  state:any;
  taxiName:any;
  v_id:any;
  con_id:any;
  tel:any;
  imgLogo:any="";
  role:any="";
  storeSelectName:any="";
  storeSelectLocation:any="";
  storeTel:any;
  taxiPhoto:any="";
  resposeData:any;
  mapsDirection:any="";
  displayData={checkerData:{username:"",id:"",name:"",surname:"",status:"",tel:"",v_id:"",photo:""}};

  constructor(public navCtrl: NavController,public authService: ApiServiceProvider,public fcm:FCM
    ,private sanitizer: DomSanitizer,public alerCtrl:AlertController
    ,public zone: NgZone,public confirmExit:ConfirmExit,public platform:Platform
    ,public modalCtrl:ModalController) {
      this.displayData=JSON.parse(localStorage.getItem('userData'));
      this.displayData.checkerData.username=JSON.parse(localStorage.getItem('userData')).checkerData.username;
      this.displayData.checkerData.name=JSON.parse(localStorage.getItem('userData')).checkerData.name;
      this.displayData.checkerData.surname=JSON.parse(localStorage.getItem('userData')).checkerData.surname;
      this.displayData.checkerData.tel=JSON.parse(localStorage.getItem('userData')).checkerData.tel;
      this.displayData.checkerData.v_id=JSON.parse(localStorage.getItem('userData')).checkerData.v_id;

  }
  ionViewWillEnter()
  {


    setTimeout(()=>{
      this.initLoading=false;
  
       },500);


       this.state=  localStorage.getItem('checker-status');

    if(localStorage.getItem('checker-photo'))
    {
      this.displayData.checkerData.photo=localStorage.getItem('checker-photo');
    }
    else
    {
      this.displayData.checkerData.photo="./assets/imgs/profile.jpg";
    }


   
  }

  presentProfileModal(popup_select) {
    this.show_popup=true;
    let profileModal = this.modalCtrl.create("ModalPage", { popup_select: popup_select },{cssClass: "modal-fullscreen-50",enableBackdropDismiss:false});
    profileModal.onDidDismiss(data => {
      this.show_popup=data.popup;
      this.displayData.checkerData.tel=JSON.parse(localStorage.getItem('userData')).checkerData.tel;
      this.displayData.checkerData.v_id=JSON.parse(localStorage.getItem('userData')).checkerData.v_id;


      this.confirmExit.enable();
    });
    profileModal.present();
  }

  ionViewWillLeave()
  {

  }

 



  storeList()
  {
    this.navCtrl.push("StoreListPage");
  }
  gotoPhotoEdit()
  {
          // this.navCtrl.setRoot(AdsPage,{ref_page_id:page_id,state:"none"},{ animate: true, animation: 'wp-transition', duration: 1000 });
      //  this.navCtrl.setRoot(AdsPage,{ref_page_id:page_id,state:"none"},{animate: true, direction: 'forward', duration: 1000});
        //this.navCtrl.setRoot(AdsPage,{ref_page_id:page_id,state:"none"},{ animate: true, animation: 'ios-transition ',direction:'forward' ,duration: 1000 });
       // this.navCtrl.setRoot(PhotoEditPage,{ animate: true, animation: 'wp-transition ',direction:'forward' ,duration: 1000 });
        //this.navCtrl.setRoot(AdsPage,{ref_page_id:page_id,state:"none"},{ animate: true, animation: 'md-transition,', direction:'back',duration: 1000 });

    this.navCtrl.push(PhotoEditPage)
  }

 gotoBranch()
 {
   this.navCtrl.push("BranchMapsPage");
 }

 gotoTest()
 {
   this.navCtrl.push("CardCustomPage");
 }

  openMaps()
  {

  }

  call()
  {
    let tel=this.storeTel;
   // console.log(tel[1]);
    window.open('tel:'+tel);
  }
  viewHistory()
  {
    this.navCtrl.push(JobHistoryListPage);
  }

  toggleStatus()
  {
    if(this.state)
    {
  
      this.updateStatus(this.state)
      this.fcm.unsubscribeFromTopic('all-checker');
      localStorage.setItem('checker-status',this.state);

    }
    else
    {

     this.updateStatus(this.state);
     this.fcm.subscribeToTopic('all-checker');
      localStorage.setItem('checker-status',this.state);

    }
  }

  updateStatus(state)
  {
    console.log("orderlist");
    let postDat ={con_id:this.con_id,status:state};
    console.log(postDat);
    this.authService.postData(postDat,"updateTaxiStatusManual").then((result) =>{
      this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData

      if(this.resposeData.orderData!="null"){ // ถ้าข้อมูลถูกต้อง
     
        if(this.resposeData.orderData!="null"){ // ถ้าข้อมูลถูกต้อง

        }else{
    
        }  
        


      }else{
      
      }
      }, (err) => {

      });
  }





}
