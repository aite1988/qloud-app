import { Component, NgZone, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, Slides, Content } from 'ionic-angular';
// นำเข้า api-service
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoEditPage } from '../photo-edit/photo-edit';
import { JobDetailPhotoPage } from '../job-detail-photo/job-detail-photo';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-job-detail-addmore',
  templateUrl: 'job-detail-addmore.html',
})
export class JobDetailAddMorePage {
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides;
  SwipedTabsIndicator: any = null;
  headerShow:any;
  isSwippe: any = false;
  tabs: any = [];
  @ViewChild(Content) content: Content;


  app_id: any = "";
  resposeData: any = "";
  jobDat = { app_id: "", cus_card_id: '', cus_car_owner: '', cus_career: '', cus_home_type: '', cus_home_owner: '', cus_tcard_id: '', cus_tcard_type: '', cus_tcard_issue: '', cus_career_position: '', cus_income: '', cus_career_time: '', cus_career_address: '', cus_address: '', cus_send_address: '', cus_status: '', cus_mate: '', sup_name: '', sup_surname: '', sup_card_id: '', sup_tel: '', sup_relation: '', sup_career: '', sup_home_type: '', sup_home_owner: '', sup_tcard_id: '', sup_tcard_type: '', sup_tcard_issue: '', sup_career_position: '', sup_income: '', sup_career_time: '', sup_career_address: '', sup_address: '', sup_send_address: '', sup_status: '', sup_mate: '', car_color: '', car_body_number: '', car_engine_number: '', car_door_number: '', car_type_detail: '', car_hp: '', car_engine_cylinder: '', car_distance_mile: '', car_weight: '', car_condition: '', car_register_date: '', car_insurance: '', car_insurance_expire: '', car_cooperative: '', car_radio_regis: '', cus_address_prov: '', cus_address_di: '', cus_address_zipcode: '', sup_address_prov: '', sup_address_di: '', sup_address_zipcode: '' };
  mapsShow: any = "";
  mapsDirection: any = "";
  stat: any = "init";
  status: any = "";
  status_new: any = "";
  signature: any = "";
  con_id: any;
  storeId: any;
  distance: any;
  initLoading = true;
  checker_id: any;
  getProvinceDatCus: any;
  provinceDatCus: any = [];
  diDatCus: any = [];

  getProvinceDatSup: any;
  provinceDatSup: any = [];
  diDatSup: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private platform: Platform
    , private alertCtrl: AlertController
    , public authService: ApiServiceProvider, private sanitizer: DomSanitizer
    ,public zone: NgZone) {
    this.jobDat.app_id = this.navParams.get('app_id');

    this.getProvinceDatCus = this.authService.provinceDat();
    this.provinceDatCus = [...new Set(this.getProvinceDatCus.map(item => item.province))];

    this.getProvinceDatSup = this.authService.provinceDat();
    this.provinceDatSup = [...new Set(this.getProvinceDatSup.map(item => item.province))];


  }
  ionViewWillEnter() {

    this.getJobDetail();

    this.disableConfirmExit();
  }

  ionViewWillLeave() {
    this.restoreConfirmExit();
  }
  ionViewDidLoad() {
    this.SwipedTabsIndicator = document.getElementById("indicator-detail-add");
    this.tabs = ["ลูกค้่า", "ผู้ค้ำ","ข้อมูลรถ"];

    console.log('ionViewDidLoad HomePage');
    this.app_id = this.navParams.get('app_id');


    console.log(this.app_id);


  }

  getJobDetail() {
    let postDat = { app_id: this.app_id };
    console.log(postDat);
    this.authService.postData(postDat, "/applyApi/appDetailGet").then((result) => {
      this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData
      console.log(this.resposeData);
      setTimeout(() => {
        this.initLoading = false;

      }, 500);

      if (this.resposeData.jobData != "null") { // ถ้าข้อมูลถูกต้อง
        this.jobDat = this.resposeData.jobDetailData;


        console.log(this.jobDat);

      } else { }
    }, (err) => {

    });
  }

  confirmUpdate() {
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
            this.updateJob();
          }
        }
      ]
    });
    alert.present().then(() => {

    });
  }
  gotoSignature() {
    this.navCtrl.push("SignaturePage");
  }

  updateJob() {



    this.authService.postData(this.jobDat, "/applyApi/appDetailUpdate").then((result) => {
      this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData
      console.log(result);

      if (this.resposeData.res == 'success') {


        this.navCtrl.pop();


      }



    }, (err) => {


    });


  }



  call(tel) {
    // console.log(tel[1]);
    window.open('tel:' + tel);
  }


  disableConfirmExit() {
    this.platform.registerBackButtonAction(() => {

      this.navCtrl.pop();

    }, 0)
  }

  restoreConfirmExit() {
    var alertShown: boolean = false;
    this.platform.registerBackButtonAction(() => {
      if (alertShown == false) {
        let alert = this.alertCtrl.create({
          title: 'คุณต้องการออกหรือไม่? ',
          message: 'ออกจากแอพ คุณจะไม่ได้รับงานจากระบบ',
          buttons: [
            {
              text: 'ยกเลิก',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
                alertShown = false;
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
        alert.present().then(() => {
          alertShown = true;
        });
      }
    }, 0)

  }


  calculateDis(lat1long1, lat2long2) {


    let lat1 = lat1long1.split(',')[0];
    let long1 = lat1long1.split(',')[1];
    let lat2 = lat2long2.split(',')[0];
    let long2 = lat2long2.split(',')[1];


    let p = 0.017453292519943295;
    let c = Math.cos;
    let a = 0.5 - c((lat1 - lat2) * p) / 2
      + c(lat2 * p) * c((lat1) * p) * (1 - c(((long1 - long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))) * 1.5;
    //console.log("distance :"+dis);
    return dis;
  }

  gotoPhotoEdit() {
    this.navCtrl.push(JobDetailPhotoPage, { app_id: this.app_id });
  }

  filterDiCus(province) {

    this.diDatCus = this.getProvinceDatCus.filter((item) => {
      return ((item.province.toLowerCase().indexOf(province.toLowerCase()) > -1));
    })

  }

  filterZipcodeCus(di) {
    let zipcode = { zipcode: "" };
    zipcode = this.getProvinceDatCus.filter((item) => {
      return ((item.di.toLowerCase().indexOf(di.toLowerCase()) > -1));
    })
    console.log(zipcode);
    this.jobDat.cus_address_zipcode = zipcode[0].zip_code;
  }


  filterDiSup(province) {

    this.diDatSup = this.getProvinceDatSup.filter((item) => {
      return ((item.province.toLowerCase().indexOf(province.toLowerCase()) > -1));
    })

  }

  filterZipcodeSup(di) {
    let zipcode = { zipcode: "" };
    zipcode = this.getProvinceDatSup.filter((item) => {
      return ((item.di.toLowerCase().indexOf(di.toLowerCase()) > -1));
    })
    console.log(zipcode);
    this.jobDat.sup_address_zipcode = zipcode[0].zip_code;
  }



  isScrolling(event)
  {
    //console.log(this.content.scrollTop);
    if(event.scrollTop>100)
    {

      console.log(event.scrollTop);
      console.log(this.content);
      console.log(this.headerShow);
      this.zone.run(()=>{
        this.headerShow=true;
      })
    }
    else
    {
      this.zone.run(()=>{
        this.headerShow=false;
      })
      console.log(this.headerShow);
      console.log(event.scrollTop);
    }


  }


  selectTab(index) {    
    this.isSwippe=false;
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(100*index)+'%,0,0)';
    this.SwipedTabsSlider.slideTo(index, 500);
  }

  updateIndicatorPosition() {
      // this condition is to avoid passing to incorrect index
      //console.log(this.SwipedTabsSlider);
      this.isSwippe=false;
  	if( this.SwipedTabsSlider.length()> this.SwipedTabsSlider.getActiveIndex())
  	{
  		this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(this.SwipedTabsSlider.getActiveIndex() * 100)+'%,0,0)';
  	}
    
    }

    animateIndicator($event) {
  
     // console.log($event.progress);
    // console.log(this.SwipedTabsIndicator);
     this.isSwippe=true;

      if(this.SwipedTabsIndicator)
           this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress* (this.SwipedTabsSlider.length()-1))*100) + '%,0,0)';
    }

    swipedStyle()
    {
      if(this.isSwippe)
      {
        return {'width.%': (100/this.tabs.length),'transition':'0s all'};
      }
      else
      {
        return {'width.%': (100/this.tabs.length),'transition':'0.5s all'};
      }
   
    }

}
