import { Component ,ViewChild,NgZone} from '@angular/core';
import { NavController ,Slides, Platform, IonicPage, NavParams, AlertController} from 'ionic-angular';
import { Content,ModalController,ViewController } from 'ionic-angular';
import { LoginPage } from '../../login/login';
import { FCM } from '@ionic-native/fcm';
import { ApiServiceProvider } from '../../../providers/api-service/api-service';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {
  @ViewChild(Content) content: Content;
  headerShow:any;
  initLoading=true;
  show_popup=false;
  popup_top=200;
  popup_top_before=0;
  popup_select:any;
  resposeData:any;
  displayData={checkerData:{username:"",id:"",name:"",surname:"",status:"",tel:"",v_id:"",photo:""}};

  constructor(public navCtrl: NavController,public zone: NgZone,public platform:Platform
    ,public modalCtrl: ModalController
    ,public viewCtrl:ViewController
    ,public navParams:NavParams
    ,public fcm:FCM
    ,public alerCtrl:AlertController
    ,public authService:ApiServiceProvider) {
      this.popup_select=navParams.get('popup_select');
      this.displayData=JSON.parse(localStorage.getItem('userData'));
      this.displayData.checkerData.username=JSON.parse(localStorage.getItem('userData')).checkerData.username;
      this.displayData.checkerData.name=JSON.parse(localStorage.getItem('userData')).checkerData.name;
      this.displayData.checkerData.surname=JSON.parse(localStorage.getItem('userData')).checkerData.surname;
      this.displayData.checkerData.tel=JSON.parse(localStorage.getItem('userData')).checkerData.tel;
      this.displayData.checkerData.v_id=JSON.parse(localStorage.getItem('userData')).checkerData.v_id;

      this.platform.registerBackButtonAction(() => {

        this.dismiss();
        
      }, 0)

  }

  dismiss() {
    let data = { 'popup': false };
    this.viewCtrl.dismiss(data);
  }

  dismissDelay()
  {
    setTimeout(()=>{
      this.dismiss(); 

       },200);
  }


popupBodyTheme()
{
  //let popuptop=this.popup_top_padding+"px";
  return {"height":"100%","width":"100%","position":"absolute","top":"0px","z-index":"9999","background-color":"white","border-radius":"20px 20px 0px 0px"};
}


logout()
{
  let elements = document.querySelectorAll(".tabbar");
  if (elements != null) {
      Object.keys(elements).map((key) => {
          elements[key].style.display = 'none';
      });
  } //hide tab bar



    this.fcm.subscribeToTopic(this.displayData.checkerData.username);
    this.fcm.unsubscribeFromTopic('all-checker');

  localStorage.clear();

    let alert = this.alerCtrl.create({
      title: 'ออกจากระบบแล้ว',
      message: 'ขอบคุณครับ',
      buttons: ['Ok']
    });
    alert.present()
    //this.dismiss();
  
 this.navCtrl.setRoot(LoginPage,{},{ animate: true, animation: 'ios-transition ',direction:'back' ,duration: 1000 });
 
}


updateTel()
{
  console.log("update tel");
  let postDat ={username:this.displayData.checkerData.username,tel:this.displayData.checkerData.tel};
  console.log(postDat);
  this.authService.postData(postDat,"/checkerApi/checkerUpdateTel").then((result) =>{
    this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData
    localStorage.setItem('userData',JSON.stringify(this.displayData));
    console.log(this.displayData);
    this.dismiss();
    }, (err) => {

    });
}

updateVid()
{
  console.log("update tel");
  let postDat ={username:this.displayData.checkerData.username,v_id:this.displayData.checkerData.v_id};
  console.log(postDat);
  this.authService.postData(postDat,"/checkerApi/checkerUpdateVid").then((result) =>{
    this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData
    localStorage.setItem('userData',JSON.stringify(this.displayData));
    this.dismiss();
    }, (err) => {

    });
}


 

}