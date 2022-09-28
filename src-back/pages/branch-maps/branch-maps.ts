import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ActionSheetController, PopoverController, ViewController, LoadingController, App } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

import { DomSanitizer } from '@angular/platform-browser';
import { Slides } from 'ionic-angular';
/**
 * Generated class for the LongdoMapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var longdo:any;
@IonicPage()
@Component({
  selector: 'page-branch-maps',
  templateUrl: 'branch-maps.html',
})
export class BranchMapsPage {
  @ViewChild('map') map:ElementRef;
  @ViewChild(Slides) slides: Slides;
  lat:any;
  long:any;
  latLng:any="";
  test:any;
  maps:any="";
  store_id:any;
  get_data:any;
  get_store_data:any;
  role:any;
  store_group:any;
  mode:any="maps";
  username:any;
  cus_location:any;
  currentIndex=0;
  url="https://taxi-delivery.com/api-foodmee/";
  searchInput:any;

  input:any={lat:"",lng:"",tel:""};

  resInfo:any=[];
  branchPos:any=[];
  resposeData:any;
  hide_loading=false;
  page:any= [];
page_count = 0;

show_popup=false;
show_popup_data={"name":"","address":"","tel":"","photo":"","distance":"","lat":"","lng":""};



  constructor(public navCtrl: NavController, public navParams: NavParams,public alerCtrl:AlertController
    ,public authService: ApiServiceProvider
    ,private modalCtrl: ModalController
    ,private actionSheetCtrl:ActionSheetController
    ,private popOverCtrl:PopoverController
    ,private loadingCtrl:LoadingController
    ,public appCtrl: App
    ,public viewCtrl: ViewController
    ,public sanitizer:DomSanitizer) {



  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LongdoMapsPage');
    this.page= [];
    this.page_count = 0;

    setTimeout(()=>{
      this.initMaps();
      this.getCurrentLocation();
       },500);
  }

  ionViewWillEnter()
  {

  }

  reInitMaps()
  {
    setTimeout(()=>{
      this.initMaps();
      this.getCurrentLocation();
      this.showBranch();
       },500);

  }
  reInitLocation()
  {
    setTimeout(()=>{
      this.initMaps();
      this.getCurrentLocation();
       },500);

       let alert = this.alerCtrl.create({
        title: 'กดอนุญาติให้อ่านค่า GPS',
        message: 'เพื่อค้นหาพิกัดของท่าน',
        buttons: ['Ok']
      });
      alert.present()

  }
  initMaps()
  {
    let mapEle = this.map.nativeElement;
   // localStorage.removeItem('map');

    this.maps = new longdo.Map({
      placeholder: mapEle,
      ui: longdo.UiComponent.Full
    });


  //console.log(this.maps);



    this.maps.Ui.DPad.visible(false);
     //this.maps.Ui.Zoombar.visible(false);
     this.maps.Ui.Geolocation.visible(false);
     this.maps.Ui.Toolbar.visible(false);
      this.maps.zoom( 10, true);
 
      this.maps.Ui.LayerSelector.visible(false);
      this.maps.Ui.Fullscreen.visible(false);
      this.maps.Ui.Crosshair.visible(false);
      this.maps
     // map.Ui.Scale.visible(false);

     var popup1 = new longdo.Popup(
      {
        title: 'Popup',
        detail: 'Simple popup'
      });
      this.maps.Overlays.add(popup1);
    
      /* For test only */
      this.cus_location= "13.817522, 100.495783";
      let latlon={lat:this.cus_location.split(",")[0],lon:this.cus_location.split(",")[1]}
      let marker=new longdo.Marker(latlon,        
        {title: 'คุณอยู่นี่',
      icon: {
        url: './assets/icon/google-maps.svg',
       offset: { x: 18, y: 45 }
      }
    });
    this.maps.Overlays.add(marker);
    this.maps.location(latlon, true);
        /* End For test only */

      this.branchList();

  }

  branchList()
   {
     let lat=this.cus_location.split(",")[0];
     let long=this.cus_location.split(",")[1];
      let postDat={lat:lat,long:long,radius:"0.1"};
      //console.log(postDat);
      let loading = this.loadingCtrl.create({
        spinner: 'circles',
        content: 'กำลังค้นหา...',
       // cssClass: 'my-loading-class'
      });
      
     // loading.present();
      this.authService.postData(postDat,'/branchApi/listBranch').then((result) => {
         this.resposeData=result;
         this.get_data=this.resposeData.branchData;
        console.log(this.get_data);
        loading.dismiss();

         this.get_data.forEach((item)=>{


            this.branchPos.push({lat:parseFloat(item.lat), lon:parseFloat(item.lng),  
               info:'<b>'+item.name+'</b><br>'+item.address+'<br><br><br><a style="background-color:rgb(189, 3, 80);color:white;padding:10px;border-radius:10px" href="https://www.google.com/maps/dir//'+item.lat+','+item.lng+'">เปิดแผนที่</a><br><br>',
            title:item.name, 
           detail:item.tel,
           status:item.address})

       item.distance=this.calculateDistance(this.cus_location.split(",")[0],this.cus_location.split(",")[1],item.lat,item.lng);
        
         });
         console.log(this.branchPos);
     //   console.log(this.get_data);
         this.get_data=this.get_data.sort((a,b)=>{
          return a.distance-b.distance;
        });

        for (let i = 1; i < 10; i++) {
          if(this.page_count<this.get_data.length){
          this.page.push(this.get_data[this.page_count])
         // this.wpDataSet.push( this.wpDataSet.length );
          }
         this.page_count++;
         
        }

         let marker=[];
         this.branchPos.forEach(element => {
           

          marker.push(new longdo.Marker({  lat:element.lat,lon:element.lon},
            {
              title: element.title,
              detail:element.detail,
              icon: {
               url: './assets/imgs/pin-meecapital.svg'
              },
              popup: {
                size: { width: 200},
              detail:element.info
              },
              weight: longdo.OverlayWeight.Top,
              draggable: false,
            }));

         });

    marker.forEach(item=>{
      this.maps.Overlays.add(item);
    })

    console.log(marker);
       

     //    console.log(this.resPos);
         loading.dismiss();

       }, (err) => {
 
        loading.dismiss();

 
      }).catch((error) => {
      //  console.log('Error getting location', error);
      });
   }

   calculateDistance(lat1, long1, lat2, long2) {
    let p = 0.017453292519943295;
    let c = Math.cos;
    let a = 0.5 - c((lat1 - lat2) * p) / 2
      + c(lat2 * p) * c((lat1) * p) * (1 - c(((long1 - long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a)));
    return dis;
  }


getCurrentLocation()
{


  this.getGpsCurrentLocation().then((resolve)=>{
    let map =this.maps;
    map.Overlays.clear();
    this.cus_location=resolve;

    console.log("test loop latlong");
console.log(this.cus_location);
  let latlon={lat:this.cus_location.split(",")[0],lon:this.cus_location.split(",")[1]}
  console.log(latlon);
  let marker=new longdo.Marker(latlon,        
    {title: 'คุณอยู่นี่',
  icon: {
    url: './assets/imgs/pin.svg',
   offset: { x: 18, y: 45 }
  }
});
this.maps.Overlays.add(marker);
this.maps.location(latlon, true);

this.branchList();
//console.log(resolve);
  }).catch(()=>{

    let map =this.maps;
  //  map.Overlays.clear();
   // console.log("test loop latlong");
   // console.log(this.cus_location);
  let latlon={lat:this.cus_location.split(",")[0],lon:this.cus_location.split(",")[1]}
  let marker=new longdo.Marker(latlon,        
    {title: 'จุดรับ',
  icon: {
    url: './assets/imgs/pin.svg',
   offset: { x: 18, y: 45 }
  }
});
this.maps.Overlays.add(marker);
this.maps.location(latlon, true);

this.branchList();
  });

}

getGpsCurrentLocation()
{
  return new Promise((resolve)=>{

    getLocation();

    function getLocation() {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
  
        resolve("0"+","+"0");
      }
    }
    
    function showPosition(position) {
      
     // console.log(position.coords.latitude+","+position.coords.longitude);
      resolve(position.coords.latitude+","+position.coords.longitude);

    }

  });

}

call(number)
{
  let tel=number;
 console.log(tel);
  window.open('tel:'+tel);

  this.get_data.forEach(element => {

    if(element.tel==number)
    {
      element.is_tel=true;
    }


    
  });

}

openmaps(lat,lng)
{
  let maps_link="https://www.google.com/maps/dir//"+lat+","+lng;
  window.open(maps_link);
}

 openModal(dat,index) {
  // console.log(dat);
  // console.log(index);
   let photos=[];

   for (let i = 0; i < 5; i++) {
     photos=[{url:dat.cover_photo1},
      {url:dat.cover_photo2},
      {url:dat.cover_photo3},
      {url:dat.cover_photo4},
      {url:dat.cover_photo5},
      ]
   }

 //  console.log(photos);


}


like(index,id)
{
 // console.log(this.page[index].isLiked);
if(this.page[index].isLiked)
{
  this.page[index].isLiked=false;
  
}
else
{
  this.page[index].isLiked=true;
}

}

presentPostActionSheet() {
  let actionSheet = this.actionSheetCtrl.create({
    buttons: [
      {
        text: 'Save post',
        handler: () => { }
      },
      {
        text: 'Hide post',
        handler: () => { }
      },
      {
        text: 'Give feedback on this post',
        handler: () => { }
      },
      {
        text: 'Unfollow',
        handler: () => { }
      },
      {
        text: 'Turn on notifications for this post',
        handler: () => { }
      },
      {
        text: 'Copy link',
        handler: () => { }
      },
    ]
  });




 actionSheet.present();
}

presentPopover(myEvent,tel,latlong) {
  let popover = this.popOverCtrl.create("FoodmapsOptionPage",{latlong:latlong,tel:tel});
  popover.present({
    ev: myEvent
  });
}


gotoUserReview(res_id,res_name,img) {

  this.navCtrl.push("ResUserReviewPage",{res_id:res_id,res_name:res_name,img:img},{ animate: true, animation: 'md-transition',direction:'forward' ,duration: 300 });

}
/*s
gotoUserReview(res_id,res_name) {
  let userReview = this.modalCtrl.create("ResUserReviewPage",{res_id:res_id,res_name:res_name},{showBackdrop:false,enableBackdropDismiss:false,cssClass:'modalCss'});
  userReview.present();
}
*/

doInfinite(infiniteScroll) {
  console.log('Begin async operation');

  setTimeout(() => {

    console.log("infinite data set");

    for (let i = 1; i < 10; i++) {
      if(this.page_count<this.get_data.length){

      this.page.push(this.get_data[this.page_count])
     // this.wpDataSet.push( this.wpDataSet.length );
      }
      else
      {
         this.hide_loading=true;
      }
     this.page_count++;
     
    }
   


    console.log('Async operation has ended');
    infiniteScroll.complete();
  }, 500);
}

ionViewWillLeave()
{
  console.log("viewWillLeave")
}

selectBranch(item)
{
  this.show_popup=true;
  let latlon={lat:item.lat,lon:item.lng};

this.show_popup_data.photo="./assets/imgs/tcr/cover1-topcharoen.jpg";
this.show_popup_data.name=item.name;
this.show_popup_data.distance=item.distance;
this.show_popup_data.address=item.address;
this.show_popup_data.tel=item.tel;
this.show_popup_data.lat=item.lat;
this.show_popup_data.lng=item.lng;

this.maps.location(latlon, true);
this.maps.zoom( 17, true);


}

showBranch()
{

  console.log(this.currentIndex);
  console.log(this.slides.length());

 if(this.slides.length()>this.slides.getActiveIndex())
 {
  this.currentIndex =this.slides.getActiveIndex();
  this.show_popup=true;
  let latlon={lat:this.get_data[this.currentIndex].lat,lon:this.get_data[this.currentIndex].lng};

this.maps.location(latlon, true);
this.maps.zoom( 17, true);
 }
 else
 {
   this.currentIndex=this.slides.length()-1;
  this.show_popup=true;
  let latlon={lat:this.get_data[this.currentIndex].lat,lon:this.get_data[this.currentIndex].lng};

this.maps.location(latlon, true);
this.maps.zoom( 17, true);

 }

/*
setTimeout(()=>{
  this.maps.location(latlon, true);
  this.maps.zoom( 17, true);
   },1000);*/



}


searchBranch(searchText)
{
  this.page = this.get_data.filter((item) => {
    return ((item.res_name.toLowerCase().indexOf(searchText.toLowerCase()) > -1) || 
  (item.google_address.toLowerCase().indexOf(searchText.toLowerCase()) > -1));
  
  })
}

closePopup()
{
  this.show_popup=false;
        /* For test only */
      //  this.cus_location= "13.817522, 100.495783";
        let latlon={lat:this.cus_location.split(",")[0],lon:this.cus_location.split(",")[1]}
        this.maps.location(latlon, true);
        this.maps.zoom( 10, true);
}

unsetPhoto(res_id,i)
{

    this.page[i].photo="./assets/imgs/nophoto.png";



}


  
  

}

