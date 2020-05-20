import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { dateDataSortValue } from 'ionic-angular/umd/util/datetime-util';


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  symptomScore:any=0;
  intervalTimer:any;
  state:any="ไม่ว่าง";
  taxiName:any;
  v_id:any;
  con_id:any;
  tel:any;
  imgLogo:any="";
  taxiPhoto:any;
  resposeData:any;
  onprogress:any=false;
  lastSync:any;
  public press: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public authService: ApiServiceProvider) {
  }

  ionViewWillEnter()
  {
    this.taxiName=localStorage.getItem("taxi-name");
    this.v_id=localStorage.getItem("v-id");
    this.con_id=localStorage.getItem("con-id");
    this.tel=localStorage.getItem("tel");
    this.lastSync=JSON.parse(localStorage.getItem("last-sync"));
    let curTime=new Date();
  console.log(curTime.getTime()-this.lastSync);

  //console.log(this.lastSync);
    if(localStorage.getItem("taxi-status"))
    {
      if((curTime.getTime()-this.lastSync>900000))
      {
        this.state='ไม่ว่าง';
        console.log("loop");
        this.updateStatus(this.state);
      }
      else
      {
        console.log("loop2");
        this.state=localStorage.getItem("taxi-status");
      }
      console.log(this.state);

    }
    else
    {
      this.state="ไม่ว่าง";
    }



    if(localStorage.getItem('taxi-photo'))
    {
      this.taxiPhoto=localStorage.getItem('taxi-photo');
    }
    else
    {
      this.taxiPhoto="./assets/imgs/profile.jpg";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    var timer = 0;
    var timerInterval;
    var button = document.getElementById("button");


  }

  add()
  {
if(this.onprogress==false)
{
this.onprogress=true;
   this.intervalTimer = setInterval(()=>{
     if(this.symptomScore<100)
     {
      this.symptomScore+=1;
     }
     else 
     {
       if(this.state=="ว่าง")
       {
         this.state="ไม่ว่าง";
         this.updateStatus(this.state)
         localStorage.setItem('taxi-status',this.state);
         this.symptomScore=0;
         this.onprogress=false;
       }
       else
       {
        this.state="ว่าง";
        this.updateStatus(this.state)
         localStorage.setItem('taxi-status',this.state);
        this.symptomScore=0;
        this.onprogress=false;
       }
       clearInterval(this.intervalTimer);
     }

    }, 10);
      
}
  }

  release()
  {
clearInterval(this.intervalTimer);

{
  this.symptomScore=0;
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
