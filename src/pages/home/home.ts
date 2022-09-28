import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import {  NavController, NavParams, Content, Platform, ToastController, Slides } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { dateDataSortValue } from 'ionic-angular/umd/util/datetime-util';

import { FCM } from '@ionic-native/fcm';
import JsBarcode from 'jsbarcode';

import { saveAs } from 'file-saver';
import { Http, Headers } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
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
isUpdate=false;
  birthYear:any;
plt:any;
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
//   appList=[
//     { id:"1",name:"Calculatoo",photo:"./assets/imgs/card-bg1.jpg",logo:"./assets/icon/calculator-icon.png",page:"CalculatorPage",url:"",icon:"",rec:"yes",type:"app",fav:false,status_bar:"#00D1FF"},
// { id:"2",name:"คำนวนบัตรเครดิต",photo:"./assets/imgs/card-bg1.jpg",logo:"./assets/icon/creditcard-icon.png",page:"CalculatorCreditcardPage",url:"",icon:"",rec:"yes",type:"app",fav:false,status_bar:"#023642"},
// { id:"3",name:"คำนวนเงินกู้",photo:"./assets/imgs/card-bg1.jpg",logo:"./assets/icon/loan-icon.png",page:"CalculatorLoanPage",url:"",icon:"",rec:"yes",type:"app",fav:false,status_bar:"#FD0404"},
// {id:"4", name:"คำนวนเงินเกษียน",photo:"./assets/imgs/card-bg1.jpg",logo:"./assets/icon/retire-icon.png",page:"CalculatorRetirePage",url:"",icon:"",rec:"yes",type:"app",fav:false,status_bar:"#04FD80"},
// { id:"5",name:"คำนวนเงินออม",photo:"./assets/imgs/card-bg1.jpg",logo:"./assets/icon/saving-icon.png",page:"CalculatorSavingPage",url:"",icon:"",rec:"yes",type:"app",fav:false,status_bar:"#FDF904"},
// { id:"6",name:"วงล้อเสี่ยงทาย",photo:"./assets/imgs/card-bg1.jpg",logo:"./assets/icon/wheel-icon.png",page:"RandomCirclePage",url:"",icon:"",rec:"yes",type:"app",fav:false,status_bar:"#FD0475"},

//      ];

  appList=[
    { id:"1",name:"Calculatoo",photo:"./assets/imgs/card-bg1.jpg",logo:"./assets/icon/calculator-icon.png",page:"CalculatorPage",url:"https://api.itzstudio.net/api-qloudapp/applink/meesolarvec/index.html",icon:"./assets/icon/qloudapp-mini2.png",rec:"yes",type:"app",fav:false,status_bar:"#00D1FF",menu_button:"yes"},
{ id:"2",name:"คำนวนบัตรเครดิต",photo:"./assets/imgs/card-bg1.jpg",logo:"./assets/icon/creditcard-icon.png",page:"CalculatorCreditcardPage",url:"",icon:"",rec:"yes",type:"app",fav:false,status_bar:"#023642"},
{ id:"3",name:"คำนวนเงินกู้",photo:"./assets/imgs/card-bg1.jpg",logo:"./assets/icon/loan-icon.png",page:"CalculatorLoanPage",url:"",icon:"",rec:"yes",type:"app",fav:false,status_bar:"#FD0404"},
{id:"4", name:"คำนวนเงินเกษียน",photo:"./assets/imgs/card-bg1.jpg",logo:"./assets/icon/retire-icon.png",page:"CalculatorRetirePage",url:"",icon:"",rec:"yes",type:"app",fav:false,status_bar:"#04FD80"},
{ id:"5",name:"คำนวนเงินออม",photo:"./assets/imgs/card-bg1.jpg",logo:"./assets/icon/saving-icon.png",page:"CalculatorSavingPage",url:"",icon:"",rec:"yes",type:"app",fav:false,status_bar:"#FDF904"},
{ id:"6",name:"วงล้อเสี่ยงทาย",photo:"./assets/imgs/card-bg1.jpg",logo:"./assets/icon/wheel-icon.png",page:"RandomCirclePage",url:"",icon:"",rec:"yes",type:"app",fav:false,status_bar:"#FD0475"},

     ];

//      { id:"6",name:"Kapook.com",photo:"./assets/imgs/card-bg1.jpg",logo:"./assets/icon/calculator-icon.png",page:"AppLinkPage",url:"https://www.kapook.com",icon:"",rec:"yes",type:"game",fav:false},
// { id:"7",name:"thailand floriade",photo:"./assets/imgs/card-bg1.jpg",logo:"./assets/icon/calculator-icon.png",page:"AppLinkPage",url:"https://thailandfloriade2022.com/vr/#/vr-showroom",icon:"",rec:"yes",type:"game",fav:false},
  
appRecommend:any=[
  ];
  appListAll:any=[
  ];
  appListAllStore:any=[
  ];
  appListFav:any=[
  ];

  showRec=true;

  constructor(public navCtrl: NavController, public navParams: NavParams,public fcm:FCM
    ,public authService: ApiServiceProvider,public platform:Platform,public toastCtrl:ToastController
    ,public http:Http
    ,public statusBar:StatusBar
    ,public zone: NgZone) {



  }

  ionViewWillEnter()
  {
     // this.platform.runBackButtonAction();

     this.statusBar.backgroundColorByHexString('#11bada');
    this.plt=localStorage.getItem('platform');
    console.log(this.plt);


       this.initLoading=true;
      this.loadAppList();

       console.log(this.appListFav);
       
  }

  loadAppList()
  {

    if(localStorage.getItem('app_state')=='update')
    {
      this.isUpdate=true;
        // this.presentToast(err);
  setTimeout(()=>{
   this.initLoading=false;

    },1500);

console.log("error")
//this.isUpdate=true;
   this.appRecommend = [];
   this.appListAll = [];
   let fav;
   if (localStorage.getItem("fav")) {
     fav = JSON.parse(localStorage.getItem("fav"));
   }
   else {
     fav = [];
   }

   this.appRecommend = this.appList.filter((item) => {
     return ((item.rec.toLowerCase().indexOf("yes".toLowerCase()) > -1));

   })
   this.appList.forEach(element => {
     fav.forEach(item => {
       if (item == element.id) {
         element.fav = true;

       }

     })
     this.appListAll.push(element);
     this.appListAllStore.push(element);

   });
   this.appListFav=[];
   this.appList.forEach(element => {
     fav.forEach(item => {
       if (item == element.id) {
         element.fav = true;
         this.appListFav.push(element);
       }

     })
   }
   );
    }
    else
    {
      this.isUpdate=false;
      if(this.plt=='ios')
      {
        this.getAppListIos();
      }
      else
      {
        this.getAppList();
      }
      console.log("update false")
    }
  }

  ionViewDidLoad() {
    this.SwipedTabsIndicator = document.getElementById("indicator-home");
  	this.tabs=["แอพฯทั้งหมด","แอพฯที่ชอบ"];
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

    gotoPage(item){
      console.log(item);
   
      if(item.page=="AppLinkPage")
      {
        this.navCtrl.setRoot(item.page,{item:item},{ animate: false, animation: 'ios-transition',direction:'forward', duration: 1000 });
    
      }
      else
      {
        this.navCtrl.setRoot(item.page,{item:item},{ animate: true, animation: 'ios-transition',direction:'forward', duration: 1000 });
    
      }
 
    }

    markFav(id,i)
    {
      this.fcm.subscribeToTopic(id);
      console.log(i)
      let fav=[];
      if(localStorage.getItem("fav"))
      {
        fav=JSON.parse(localStorage.getItem("fav"));
        fav.push(id);
        localStorage.setItem("fav",JSON.stringify(fav));
        this.appListAll.forEach(element => {
          if(element.id==id)
          {
           element.fav=true;
          }
         });


 

      }
      else
      {
        fav.push(id);
        localStorage.setItem("fav",JSON.stringify(fav));
        this.appListAll.forEach(element => {
          if(element.id==id)
          {
           element.fav=true;
          }
         });
 
    
      }
      this.appListFav=[];
      this.appList.forEach(element => {
        fav.forEach(item=>{
            if(item==element.id)
            {
              element.fav=true;
              this.appListFav.push(element);
            }
          
        })
      }
        );

        let postDat={id:id}

        this.authService.postData(postDat,'/appApi/markFav').then((result) => {
          this.resposeData=result;
        console.log
    
        }, (err) => {
  
    
    console.log("error")
   
        });
    
    }

    removeFav(id,i)
    {
      console.log(i)
      let fav=[];
      this.fcm.unsubscribeFromTopic(id);
      if(localStorage.getItem("fav"))
      {

        
        fav=JSON.parse(localStorage.getItem("fav"));

        var index = fav.map(x => {
          return x;
        }).indexOf(id);
        fav.splice(index, 1);

        localStorage.setItem("fav",JSON.stringify(fav));
        this.appListAll.forEach(element => {
         if(element.id==id)
         {
          element.fav=false;
         }
        });

        console.log(this.appListAll);
      }
      
      this.appListFav=[];
      this.appList.forEach(element => {
        fav.forEach(item=>{
            if(item==element.id)
            {
              element.fav=true;
              this.appListFav.push(element);
            }
          
        })
      }
        );

        let postDat={id:id}

        this.authService.postData(postDat,'/appApi/unFav').then((result) => {
          this.resposeData=result;
        console.log
    
        }, (err) => {
  
    
    console.log("error")
   
        });
    
    
    }

    searchApp(searchInput)
    {
      console.log(searchInput);
      this.selectTab(0);
      if(searchInput)
      {
        this.showRec=false;
        this.appListAll = this.appListAllStore.filter((item) => {
          return ((item.name.toLowerCase().indexOf(searchInput.toLowerCase()) > -1));
  
  
        })
      }
      else
      {
        this.showRec=true;
        this.appListAll =this.appListAllStore;
      }


    }



  getAppList()
  {


    //console.log(this.userData.userData.username);
    let postDat={id:""};

    this.authService.postData(postDat,'/appApi/appList').then((result) => {
      this.resposeData=result;
      this.isUpdate=false;
      if(this.resposeData.appList.length>0)
      {
        console.log("app list > 0");
        this.appList=this.resposeData.appList;


      this.appRecommend = [];
      this.appListAll = [];
      let fav;
      if (localStorage.getItem("fav")) {
        fav = JSON.parse(localStorage.getItem("fav"));
      }
      else {
        fav = [];
      }

      this.appRecommend = this.appList.filter((item) => {
        return ((item.rec.toLowerCase().indexOf("yes".toLowerCase()) > -1));


      })


      this.appList.forEach(element => {
        fav.forEach(item => {
          if (item == element.id) {
            element.fav = true;
          }

        })
        this.appListAll.push(element);
        this.appListAllStore.push(element);
      });
      console.log(this.appListAll);
      this.appListFav=[];
      this.appList.forEach(element => {
        fav.forEach(item => {
          if (item == element.id) {
            element.fav = true;
            this.appListFav.push(element);
          }

        })
      }
      );
  
      }


      setTimeout(()=>{
        this.initLoading=false;
    
         },1500);

    }, (err) => {
     // this.presentToast(err);
     setTimeout(()=>{
      this.initLoading=false;
  
       },1500);

console.log("error")
// this.isUpdate=true;
      this.appRecommend = [];
      this.appListAll = [];
      let fav;
      if (localStorage.getItem("fav")) {
        fav = JSON.parse(localStorage.getItem("fav"));
      }
      else {
        fav = [];
      }

      this.appRecommend = this.appList.filter((item) => {
        return ((item.rec.toLowerCase().indexOf("yes".toLowerCase()) > -1));

      })
      this.appList.forEach(element => {
        fav.forEach(item => {
          if (item == element.id) {
            element.fav = true;

          }

        })
        this.appListAll.push(element);
        this.appListAllStore.push(element);

      });
      this.appListFav=[];
      this.appList.forEach(element => {
        fav.forEach(item => {
          if (item == element.id) {
            element.fav = true;
            this.appListFav.push(element);
          }

        })
      }
      );
    });
  }


  getAppListIos()
  {


    //console.log(this.userData.userData.username);
    let postDat={id:""};
    this.authService.postData(postDat,'/appApi/appListIos').then((result) => {
      this.resposeData=result;
      // this.isUpdate=false;
      if(this.resposeData.appList.length>0)
      {
        console.log("app list > 0");
        this.appList=this.resposeData.appList;


      this.appRecommend = [];
      this.appListAll = [];
      let fav;
      if (localStorage.getItem("fav")) {
        fav = JSON.parse(localStorage.getItem("fav"));
      }
      else {
        fav = [];
      }

      this.appRecommend = this.appList.filter((item) => {
        return ((item.rec.toLowerCase().indexOf("yes".toLowerCase()) > -1));


      })


      this.appList.forEach(element => {
        fav.forEach(item => {
          if (item == element.id) {
            element.fav = true;
          }

        })
        this.appListAll.push(element);
        this.appListAllStore.push(element);
      });
      console.log(this.appListAll);
      this.appListFav=[];
      this.appList.forEach(element => {
        fav.forEach(item => {
          if (item == element.id) {
            element.fav = true;
            this.appListFav.push(element);
          }

        })
      }
      );
  
      }


      setTimeout(()=>{
        this.initLoading=false;
    
         },1500);

    }, (err) => {
     // this.presentToast(err);
     setTimeout(()=>{
      this.initLoading=false;
  
       },1500);

console.log("error")
//this.isUpdate=true;
      this.appRecommend = [];
      this.appListAll = [];
      let fav;
      if (localStorage.getItem("fav")) {
        fav = JSON.parse(localStorage.getItem("fav"));
      }
      else {
        fav = [];
      }

      this.appRecommend = this.appList.filter((item) => {
        return ((item.rec.toLowerCase().indexOf("yes".toLowerCase()) > -1));

      })
      this.appList.forEach(element => {
        fav.forEach(item => {
          if (item == element.id) {
            element.fav = true;

          }

        })
        this.appListAll.push(element);
        this.appListAllStore.push(element);

      });
      this.appListFav=[];
      this.appList.forEach(element => {
        fav.forEach(item => {
          if (item == element.id) {
            element.fav = true;
            this.appListFav.push(element);
          }

        })
      }
      );
    });
  }

  CheckIsError()
  {
    if(this.isUpdate)
    {
      return {"visibility":"hidden"}
    }
    else
    {
      return {"visibility":"visible"}
    }
  }


  doRefresh(refresher)
  {
    console.log('Begin async operation', refresher);
    this.initLoading=true;
    this.loadAppList();
    
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}


