import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams , Slides , Content,Platform, AlertController} from 'ionic-angular';

import { PhotoUploadEditPage } from './photo-upload-edit/photo-upload-edit';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
/**
 * Generated class for the GoogleplayTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 * 
 *     this.defaultPic.pic1="./assets/imgs/example_car/ด้านหน้า_example.jpg";
    this.defaultPic.pic2="./assets/imgs/example_car/ด้านหลัง_example.jpg";
    this.defaultPic.pic3="./assets/imgs/example_car/มุมหน้า_example.jpg";
    this.defaultPic.pic4="./assets/imgs/example_car/มุมหลัง_example.jpg";
    this.defaultPic.pic5="./assets/imgs/example_car/เบาะหน้า_example.jpg";
    this.defaultPic.pic6="./assets/imgs/example_car/คอนโซลหน้า_example.jpg";
    this.defaultPic.pic7="./assets/imgs/example_car/เบาะหลัง_example.jpg";
    this.defaultPic.pic8="./assets/imgs/example_car/ฝาท้าย_example.jpg";
    this.defaultPic.pic9="./assets/imgs/example_car/เครื่องยนต์_example.jpg";
 */

@Component({
  selector: 'page-job-detail-photo',
  templateUrl: 'job-detail-photo.html',
})


export class JobDetailPhotoPage {

  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides ;
  @ViewChild('MultiItemsScrollingTabs') ItemsTitles : Content;

  isSwippe:any=false;
  SwipedTabsIndicator :any= null;
  tabTitleWidthArray :any= [];
  tabElementWidth_px :number= 50;
  screenWidth_px :number= 0;
  isRight :boolean= true;
  isLeft:boolean= true;
  initLoading:any=true;
  tabs:any=[];
  app_id:any;
  url="https://taxi-delivery.com/api-carmoney";
  photo={app_id:"",photo_car_front:"",photo_car_ang_front:"",photo_car_rear:"",photo_car_ang_rear:"",photo_car_front_seat:"",photo_car_rear_seat:"",photo_car_console:"",photo_car_rear_cap:"",photo_car_engine:"",photo_home_one:"",photo_home_two:"",photo_other_one:"",photo_other_two:"",photo_other_three:"",photo_other_four:""};

  photo_sample={app_id:"",photo_car_front:"./assets/imgs/example_car/front.jpg",photo_car_ang_front:"./assets/imgs/example_car/front_ang.jpg",photo_car_rear:"./assets/imgs/example_car/rear.jpg",photo_car_ang_rear:"./assets/imgs/example_car/rear_ang.jpg",photo_car_front_seat:"./assets/imgs/example_car/front_seat.jpg",photo_car_rear_seat:"./assets/imgs/example_car/rear_seat.jpg",photo_car_console:"./assets/imgs/example_car/console.jpg",photo_car_rear_cap:"./assets/imgs/example_car/rear_cap.jpg",photo_car_engine:"./assets/imgs/example_car/engine.jpg",photo_home_one:"./assets/imgs/example_car/home1.jpg",photo_home_two:"./assets/imgs/example_car/home2.jpg",photo_other_one:"",photo_other_two:"",photo_other_three:"",photo_other_four:""};

  //photo_check={car_ang_front:"",car_rear:"",car_ang_rear:"",car_front_seat:"",car_rear_seat:"",car_console:"",car_rear_cap:"",car_engine:"",home_one:"",home_two:"",other_one:"",other_two:"",other_three:"",other_four:""};
  resposeData:any;
  constructor(public navCtrl: NavController ,public platform: Platform,public navParams:NavParams,public authService:ApiServiceProvider
    ,public alertCtrl:AlertController) {
   // this.tabs=["page0","1","page2","3","page4","5","page6","7","page8","9","page For tutorual"];

    this.tabs=[{label:"1",name:"photo_car_front",photo_check:""},
    {label:"2",name:"photo_car_rear",photo_check:""},
    {label:"3",name:"photo_car_ang_front",photo_check:""},
    {label:"4",name:"photo_car_ang_rear",photo_check:""},
    {label:"5",name:"photo_car_console",photo_check:""},
    {label:"6",name:"photo_car_front_seat",photo_check:""},
    {label:"7",name:"photo_car_rear_seat",photo_check:""},
    {label:"8",name:"photo_car_rear_cap",photo_check:""},
    {label:"9",name:"photo_car_engine",photo_check:""},
    {label:"10",name:"photo_home_one",photo_check:""},
    {label:"11",name:"photo_home_two",photo_check:""},
    {label:"12",name:"photo_other_one",photo_check:""},
    {label:"13",name:"photo_other_two",photo_check:""},
    {label:"14",name:"photo_other_three",photo_check:""},
    {label:"15",name:"photo_other_four",photo_check:""}
              ];
  //  this.tabTitleWidthArray=[47,47,47,47,47,47,47,47,47,54,54];
    console.log('Width: ' + platform.width());
    this.screenWidth_px=platform.width();

  }
  ionViewWillEnter()
  {
    this.app_id=this.navParams.get('app_id');
    this.getPhoto();
   this.disableConfirmExit();

  }
  ionViewWillLeave()
  {
    this.restoreConfirmExit();
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


  ionViewDidLoad()
  {
    this.SwipedTabsIndicator = document.getElementById("indicator2");
    for (let i in this.tabs)
     this.tabTitleWidthArray.push(document.getElementById("tabTitle"+i).offsetWidth);

      console.log(this.tabTitleWidthArray);
    this.selectTab(0);
  }

  scrollIndicatiorTab()
  {
    this.ItemsTitles.scrollTo(this.calculateDistanceToSpnd(this.SwipedTabsSlider.getActiveIndex())-this.screenWidth_px/2,0);
  }

  selectTab(index)
  {
    this.isSwippe=false;
    this.SwipedTabsIndicator.style.width = this.tabTitleWidthArray[index]+"px";
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(this.calculateDistanceToSpnd(index))+'px,0,0)';
    this.SwipedTabsSlider.slideTo(index);
  }

  calculateDistanceToSpnd(index)
  {
    var result=0;
    for (var _i = 0; _i < index; _i++) {
      result=result+this.tabTitleWidthArray[_i];
    }
    return result;
  }

  updateIndicatorPosition() {
    this.isSwippe=false;
    var index=this.SwipedTabsSlider.getActiveIndex();
    if( this.SwipedTabsSlider.length()==index)
      index=index-1;

    this.SwipedTabsIndicator.style.width = this.tabTitleWidthArray[index]+"px";
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(this.calculateDistanceToSpnd(index))+'px,0,0)';

  }

  updateIndicatorPositionOnTouchEnd()
  {
    setTimeout( () => { this.updateIndicatorPosition(); }, 200);
  }

  animateIndicator($event)
  {
    this.isSwippe=true;
    this.isLeft=false;
    this.isRight=false;
    var currentSliderCenterProgress =(1/(this.SwipedTabsSlider.length()-1) )*this.SwipedTabsSlider.getActiveIndex();
    if($event.progress < currentSliderCenterProgress)
    {
      this.isLeft=true;
      this.isRight=false;

    } if($event.progress > currentSliderCenterProgress)
    {
      this.isLeft=false;
      this.isRight=true;
    }

    if(this.SwipedTabsSlider.isEnd())
      this.isRight=false;

    if( this.SwipedTabsSlider.isBeginning())
      this.isLeft=false;

    if(this.isRight)
      this.SwipedTabsIndicator.style.webkitTransform =
      'translate3d('+( this.calculateDistanceToSpnd(this.SwipedTabsSlider.getActiveIndex())
        +($event.progress - currentSliderCenterProgress) *(this.SwipedTabsSlider.length()-1)*this.tabTitleWidthArray[this.SwipedTabsSlider.getActiveIndex()+1])
      +'px,0,0)';

    if(this.isLeft)
      this.SwipedTabsIndicator.style.webkitTransform =
      'translate3d('+( this.calculateDistanceToSpnd(this.SwipedTabsSlider.getActiveIndex())
        +($event.progress - currentSliderCenterProgress) *(this.SwipedTabsSlider.length()-1)*this.tabTitleWidthArray[this.SwipedTabsSlider.getActiveIndex()-1])
      +'px,0,0)';

    if(!this.isRight && !this.isLeft)
      this.SwipedTabsIndicator.style.width = this.tabTitleWidthArray[this.SwipedTabsSlider.getActiveIndex()]+"px";

  }

  swipedStyle()
  {
    if(this.isSwippe)
    {
      return {'width.%': (100/this.tabs.length),'transition':'0s all'};
    }
    else
    {
      return {'width.%': (100/this.tabs.length),'transition':'0.3s all'};
    }
 
  }


  labelColor(photo_check)
  {
    if(photo_check=='Yes')
    {
      return {'border-bottom': '2px solid green'};
    }
    else
    {
      return {'border-bottom': '2px solid red'};
    }

  }

  getPhoto()
  {
    let postDat={app_id:this.app_id};
    console.log(postDat);
    this.authService.postData(postDat, "/applyApi/appPhotoGet").then((result) =>{
      this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData
      this.photo=this.resposeData.jobPhotoData;
      let photo=this.resposeData.jobPhotoData;

      this.tabs.forEach(element => {
        Object.keys(photo).forEach(function(key) {
          if(element.name==key)
          {
              if(photo[key]!="")
              {
                  element.photo_check="Yes";
              }
          }
  
        
      });
      });
 

      }, (err) => {

      });
  }


  uploadImage(name,label)
  {
    this.navCtrl.push(PhotoUploadEditPage,{name:name,label:label,app_id:this.app_id});
  }



}

