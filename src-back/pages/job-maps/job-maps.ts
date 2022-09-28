import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ActionSheetController, PopoverController, ViewController, LoadingController, App } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

/**
 * Generated class for the LongdoMapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var longdo:any;
@IonicPage()
@Component({
  selector: 'page-job-maps',
  templateUrl: 'job-maps.html',
})
export class JobMapsPage {
  @ViewChild('map') map:ElementRef;
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
    ,public viewCtrl: ViewController) {



  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LongdoMapsPage');
    this.page= [];
    this.page_count = 0;

    setTimeout(()=>{
      this.initMaps();
     // this.getCurrentLocation();
       },500);
  }

  ionViewWillEnter()
  {

  }

  reInitMaps()
  {
    setTimeout(()=>{
      this.initMaps();
     // this.getCurrentLocation();
       },500);

  }
  reInitLocation()
  {
    setTimeout(()=>{
      this.initMaps();
      //this.getCurrentLocation();
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
      this.maps.zoom( 13, true);
 
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



  }


   calculateDistance(lat1, long1, lat2, long2) {
    let p = 0.017453292519943295;
    let c = Math.cos;
    let a = 0.5 - c((lat1 - lat2) * p) / 2
      + c(lat2 * p) * c((lat1) * p) * (1 - c(((long1 - long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a)));
    return dis;
  }

  

}

