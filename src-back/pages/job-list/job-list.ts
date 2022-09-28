import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
// นำเข้า api-service
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { LoginPage } from '../login/login';
import { FCM } from '@ionic-native/fcm';
import { JobDetailPage } from '../job-detail/job-detail';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-job-list',
  templateUrl: 'job-list.html',
})
export class JobListPage {
  resposeData:any;
  jobDat:any=[];
  con_id:any;
  initLoading=true;
  curLatLong="13.805365, 100.485762";
  imgLogo:any="./assets/imgs/logo.png"
  intervalFetchOrder:any;
  loading:any;
  checker_id:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: ApiServiceProvider,
    public fcm:FCM,
    public alerCtrl:AlertController
    ,public loadingCtrl:LoadingController) {

      this.checker_id=JSON.parse(localStorage.getItem('userData')).checkerData.username;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    
  }

  ionViewWillEnter()
  {console.log("enter joblist page");
  this.initLoading=true;
  this.jobList();

  }

  ioViewWillLeave()
  {
    console.log("pause intervalFetchOrder Job-list");
    clearInterval(this.intervalFetchOrder);
  }

  jobList()
  {
    let postDat={checker_id:this.checker_id}

    this.authService.postData(postDat, "/applyApi/applistChecker").then((result) =>{
      this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData
      this.initLoading=false;
        this.jobDat=this.resposeData.jobData;
      console.log(this.jobDat);
      }, (err) => {

      });
      



  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.jobList();
      refresher.complete();
    }, 2000);
  }

  viewJobs(app_id)
  {
    this.navCtrl.push(JobDetailPage,{app_id:app_id});

  }

  acceptJob(app_id)
  {
    
    let postDat={app_id:app_id,checker_id:this.checker_id}


      let alert = this.alerCtrl.create({
        title: 'รับงานแล้ว',
        message: '',
        buttons: ['Ok']
      });

    this.authService.postData(postDat, "/applyApi/checkerAccept").then((result) =>{
      this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData

      alert.present();
      this.jobList();
      }, (err) => {

      });
      
  }


  rejectJob(app_id)
  {
    
    let postDat={app_id:app_id,checker_id:this.checker_id}


      let alert = this.alerCtrl.create({
        title: 'ยกเลิกแล้วงานแล้ว',
        message: '',
        buttons: ['Ok']
      });

    this.authService.postData(postDat, "/applyApi/checkerReject").then((result) =>{
      this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData
console.log(this.resposeData);
      alert.present();
      this.jobList();
      }, (err) => {

      });
      
  }


  calculateDistance(latlong1, latlong2) {
    let lat1 =latlong1.split(",")[0];
    let long1 =latlong1.split(",")[1];
    let lat2 =latlong2.split(",")[0];
    let long2 =latlong2.split(",")[1];
    let p = 0.017453292519943295;
    let c = Math.cos;
    let a = 0.5 - c((lat1 - lat2) * p) / 2
      + c(lat2 * p) * c((lat1) * p) * (1 - c(((long1 - long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a)));
    return dis;
  }

  statusColor(status)
  {
    if(status=='รอตอบรับ')
    {
      return {'background-color':'red'};
    }
    else
    {
        return {'background-color':'#595959'};
    }
  }


  clearAllInterval()
  {
    var interval_id = window.setInterval("", 9999); // Get a reference to the last
    // interval +1
  for (var i = 1; i < interval_id; i++)
  {
  window.clearInterval(i);
  }
  }

}
