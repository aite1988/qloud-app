import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
// นำเข้า api-service
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { ConfirmExit } from '../../providers/confirm-exit';
import { JobDetailPage } from '../job-detail/job-detail';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-job-history-list',
  templateUrl: 'job-history-list.html',
})
export class JobHistoryListPage {
  resposeData:any;
  jobDat:any=[];
  checker_id:any;
  curLatLong="13.805365, 100.485762";
  imgLogo:any="./assets/imgs/logo.png";
  initLoading:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: ApiServiceProvider
    ,public platform:Platform,public confirmExit:ConfirmExit) {
 
      this.checker_id=JSON.parse(localStorage.getItem('userData')).checkerData.username;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ionViewWillEnter()
  {
    this.initLoading=true;
    this.jobList();
    this.platform.registerBackButtonAction(() => {
  
      this.navCtrl.pop(); 
      
    }, 0)
  }

 jobList()
  {
    let postDat ={checker_id:this.checker_id};
    console.log(postDat);
    this.authService.postData(postDat, "/applyApi/applistHistoryChecker").then((result) =>{
      this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData
      console.log(this.resposeData);
      this.jobDat=this.resposeData.jobData;
      setTimeout(()=>{
        this.initLoading=false
    
         },1500);

      }, (err) => {

      });
  }

  viewJobs(app_id)
  {
    this.navCtrl.push(JobDetailPage,{app_id:app_id});
  }

  ionViewWillLeave()
  {
    this.confirmExit.enable();
  }
  
}
