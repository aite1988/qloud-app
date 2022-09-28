import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import {  NavController, NavParams, Content, Platform, ToastController, Slides } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { dateDataSortValue } from 'ionic-angular/umd/util/datetime-util';

import { FCM } from '@ionic-native/fcm';
import JsBarcode from 'jsbarcode';

import { saveAs } from 'file-saver';
import { Http, Headers } from '@angular/http';
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
  @ViewChild('barcode') barcode: ElementRef;
  @ViewChild(Content) content: Content;
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides ;
  
  symptomScore:any=0;
  intervalTimer:any;
  state:any;
  taxiName:any;
  v_id:any;
  con_id:any;
  tel:any;
  imgLogo:any="";
  taxiPhoto:any;
  resposeData:any;
  onprogress:any=false;
  lastSync:any;
  sumScore:any;
  initLoading=true;
  card_data:any={barCode:""};

  birthYear:any;

  headerShow:any;
  show_popup=false;
  popup_top=200;
  popup_top_before=0;
  popup_select:any;
  public press: number = 0;
  displayData={name:"",surname:""};


 
   SwipedTabsIndicator :any= null;
  
  isSwippe:any=false;
  tabs:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public fcm:FCM
    ,public authService: ApiServiceProvider,public platform:Platform,public toastCtrl:ToastController
    ,public http:Http
    ,public zone: NgZone) {
      this.displayData.name=JSON.parse(localStorage.getItem("userData")).checkerData.name;
      this.displayData.surname=JSON.parse(localStorage.getItem("userData")).checkerData.surname;
  }

  ionViewWillEnter()
  {
 
    setTimeout(()=>{
      this.initLoading=false;
  
       },2500);

       this.initLoading=true;

  }

  ionViewDidLoad() {
    this.SwipedTabsIndicator = document.getElementById("indicator-home");
  	this.tabs=["ประกาศ","ข้อความ"];
  }




  getReport()
  {

    let postDat ={
      "template": {
          "shortid": "rkJTnK2ce"
      },
      "data": {
          "number": "000000",
          "seller": {
              "name": "Mee Digital",
              "road": "455/9",
              "country": "Thailand"
          },
          "buyer": {
              "name": "Acme Corp.",
              "road": "16 Johnson Road",
              "country": "Paris, France 8060"
          },
          "items": [
              {
                  "name": "Website design",
                  "price": 300
              }
          ]
      },
      "options": {
          "reports": {
              "save": true
          }
      }
  };
    

      var mediaType = 'application/pdf';
        const req = new XMLHttpRequest();
        req.responseType = 'arraybuffer';
        req.open('POST',"http://dcmcap.fortiddns.com:5400/api/report");
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify(postDat));
  
        req.onload = () => {
          const data = req.response;
          var blob = new Blob([data], { type: mediaType });
          saveAs(blob, 'report');

        };
     
  
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
