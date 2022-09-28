import { Component ,ViewChild,NgZone} from '@angular/core';
import { NavController ,Slides, Platform, IonicPage, NavParams, AlertController} from 'ionic-angular';
import { Content,ModalController,ViewController } from 'ionic-angular';
import { ApiServiceProvider } from '../../../providers/api-service/api-service';

@IonicPage()
@Component({
  selector: 'page-popup-jobdetail',
  templateUrl: 'popup-jobdetail.html'
})
export class PopupJobdetailPage {
  @ViewChild(Content) content: Content;
  headerShow:any;
  initLoading=true;
  show_popup=false;
  popup_select:any;
  resposeData:any;
  app_id:any;
  check_result:any=[];
  checker_id:any;
  displayData={checkerData:{username:"",id:"",name:"",surname:"",status:"",tel:"",v_id:"",photo:""}};

  constructor(public navCtrl: NavController,public zone: NgZone,public platform:Platform
    ,public modalCtrl: ModalController
    ,public viewCtrl:ViewController
    ,public navParams:NavParams
    ,public alerCtrl:AlertController
    ,public authService:ApiServiceProvider) {
      this.popup_select=navParams.get('popup_select');
      this.app_id=navParams.get('app_id');
      this.checker_id=JSON.parse(localStorage.getItem('userData')).checkerData.username;
      this.platform.registerBackButtonAction(() => {

        this.dismiss();
        
      }, 0)

      this.checkFulfilment();

  }

  dismiss() {
    let data = { 'popup': false};
    this.viewCtrl.dismiss(data);
  }

 dismissAndExit(){
  let data = { 'popup': false,'exit':true};
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


checkFulfilment()
{
  let key_name=[
    {"id":"app_id","name":"แอพไอดี"},
{"id":"app_token","name":"แอพโทเคน"},
{"id":"con_type","name":"ประเภทสัญญา"},
{"id":"cus_name","name":"ชื่อผู้สมัคร"},
{"id":"cus_surname","name":"นามสกุลผู้สมัคร"},
{"id":"cus_tel","name":"เบอร์โทรผู้สมัคร"},
{"id":"cus_address","name":"ที่อยู่ตามทะเบียนบ้าน"},
{"id":"cus_birthdate","name":"วันเดือนปีเกิด"},
{"id":"cus_age","name":"อายุลูกค้า"},
{"id":"date_app","name":"วันที่สมัคร"},
{"id":"credit_app","name":"วงเงินที่สมัคร"},
{"id":"credit_installment","name":"จำนวนงวดผ่อนชำระ"},
{"id":"credit_int","name":"อัตราดอกเบี้ยต่อปี"},
{"id":"cus_address_di","name":"อำเภอ ที่อยู่ลูกค้า"},
{"id":"cus_address_prov","name":"จังหวัด ที่อยู่ลูกค้า"},
{"id":"cus_address_zipcode","name":"รหัสไปรษณี ที่อยู่ลูกค้า"},
{"id":"car_vid","name":"ทะเบียนรถ"},
{"id":"car_province","name":"จังหวัดรถ"},
{"id":"car_brand","name":"ยี่ห้อรถ"},
{"id":"car_type","name":"ประเภทรถ"},
{"id":"car_year","name":"ปีรถ"},
{"id":"car_series","name":"รุ่นรถ"},
{"id":"car_gear","name":"เกียร์รถ"},
{"id":"car_detail","name":"รายละเอียดรุ่นรถย่อย"},
{"id":"appoint_place","name":"สถานที่นัด"},
{"id":"appoint_detail","name":"รายละเอียดสถานที่นัด"},
{"id":"appoint_date","name":"วันที่นัด"},
{"id":"appoint_time","name":"เวลานัด"},
{"id":"appoint_latlng","name":"พิกัดจุดนัดหมาย"},
{"id":"checker_id","name":"username checker ที่ตรวจสอบ"},
{"id":"checker_name","name":"ชื่อเช็คเกอร์"},
{"id":"admin_id","name":"username แอดมิน ที่ตรวจสอบ"},
{"id":"admin_name","name":"ชื่อแอดมิน"},
{"id":"status","name":"สถานะงาน"},
{"id":"remark","name":"หมายเหตุ"},
{"id":"app_id","name":"แอพไอดี"},
{"id":"photo_car_front","name":"ภาพรถด้านหน้า"},
{"id":"photo_car_ang_front","name":"ภาพรถมุมหน้า"},
{"id":"photo_car_rear","name":"ภาพรถด้านหลัง"},
{"id":"photo_car_ang_rear","name":"ภาพรถมุมหลัง"},
{"id":"photo_car_front_seat","name":"ภาพรถเบาะหน้า"},
{"id":"photo_car_rear_seat","name":"ภาพรถเบาะหลัง"},
{"id":"photo_car_console","name":"ภาพรถคอนโซลหน้า"},
{"id":"photo_car_rear_cap","name":"ภาพรถฝากระโปรงหลัง"},
{"id":"photo_car_engine","name":"ภาพเครื่องยนต์รถ"},
{"id":"photo_home_one","name":"ภาพบ้านหนึ่ง"},
{"id":"photo_home_two","name":"ภาพบ้านสอง"},
{"id":"photo_other_one","name":"ภาพเอกสาร1"},
{"id":"photo_other_two","name":"ภาพเอกสาร2"},
{"id":"photo_other_three","name":"ภาพเอกสาร3"},
{"id":"photo_other_four","name":"ภาพเอกสาร4"},
{"id":"app_id","name":"แอพไอดี"},
{"id":"cus_card_id","name":"เลขที่บัตรประชาชนลูกค้า"},
{"id":"cus_car_owner","name":"ผู้ครอบครองรถ"},
{"id":"cus_career","name":"อาชีพลูกค้า"},
{"id":"cus_home_type","name":"ลักษณะบ้าน"},
{"id":"cus_home_owner","name":"กรรมสิทธิ์ในบ้าน"},
{"id":"cus_tcard_id","name":"เลขที่ใบขับขี่"},
{"id":"cus_tcard_type","name":"ประเภทใบขับขี่"},
{"id":"cus_tcard_issue","name":"ออกให้โดย"},
{"id":"cus_career_position","name":"ตำแหน่งงาน"},
{"id":"cus_income","name":"รายได้"},
{"id":"cus_career_time","name":"อายุงาน"},
{"id":"cus_career_address","name":"ที่อยู่บริษัท"},
{"id":"cus_address","name":"ที่อยู่ตามทะเบียนบ้าน"},
{"id":"cus_send_address","name":"ที่อยู่ส่งเอกสาร"},
{"id":"cus_status","name":"สถานภาพ"},
{"id":"cus_mate","name":"คู่สมรส"},
{"id":"sup_name","name":"ชื่อผู้ค้ำ"},
{"id":"sup_surname","name":"นามสกุลผู้ค้ำ"},
{"id":"sup_card_id","name":"เลขที่บัตรประชาชนผู้ค้ำ"},
{"id":"sup_tel","name":"เบอร์โทรผู้ค้ำ"},
{"id":"sup_relation","name":"ความสัมพันธ์"},
{"id":"sup_career","name":"อาชีพผู้ค้ำ"},
{"id":"sup_home_type","name":"ลักษณะบ้านผู้ค้ำ"},
{"id":"sup_home_owner","name":"กรรมสิทธิ์ในบ้านผู้ค้ำ"},
{"id":"sup_tcard_id","name":"เลขที่ใบขับขี่ผู้ค้ำ"},
{"id":"sup_tcard_type","name":"ประเภทใบขับขี่ผู้ค้ำ"},
{"id":"sup_tcard_issue","name":"ออกให้โดย"},
{"id":"sup_career_position","name":"ตำแหน่งงานผู้ค้ำ"},
{"id":"sup_income","name":"รายได้ผู้ค้ำ"},
{"id":"sup_career_time","name":"อายุงานผู้ค้ำ"},
{"id":"sup_career_address","name":"ที่อยู่บริษัทผู้ค้ำ"},
{"id":"sup_address","name":"ที่อยู่ตามทะเบียนบ้านผู้ค้ำ"},
{"id":"sup_address_di","name":"อำเภอ ที่อยู่ผู้ค้ำ"},
{"id":"sup_address_prov","name":"จังหวัด ที่อยู่ผู้ค้ำ"},
{"id":"sup_address_zipcode","name":"รหัสไปรษณี ที่อยู่ผู้ค้ำ"},
{"id":"sup_send_address","name":"ที่อยู่ส่งเอกสารผู้ค้ำ"},
{"id":"sup_status","name":"สถานภาพผู้ค้ำ"},
{"id":"sup_mate","name":"คู่สมรสผู้ค้ำ"},
{"id":"car_color","name":"สีรถ"},
{"id":"car_body_number","name":"เลขตัวถัง"},
{"id":"car_engine_number","name":"หมายเลขเครื่อง"},
{"id":"car_door_number","name":"จำนวนประตู"},
{"id":"car_type_detail","name":"ประเภทรถ"},
{"id":"car_hp","name":"แรงม้า"},
{"id":"car_engine_cylinder","name":"จำนวนสูบ"},
{"id":"car_distance_mile","name":"เลขไมล์"},
{"id":"car_weight","name":"น้ำหนักรถ"},
{"id":"car_condition","name":"สภาพรถ"},
{"id":"car_register_date","name":"วันที่จดทะเบียน"},
{"id":"car_insurance","name":"บริษัทประกัน"},
{"id":"car_insurance_expire","name":"วันหมดประกัน"},
{"id":"car_cooperative","name":"สหกรณ์"},
{"id":"car_radio_regis","name":"ศูนย์วิทยุ"}
  ]


  let postDat ={app_id:this.app_id};
  console.log(postDat);
  this.authService.postData(postDat, "/applyApi/appgetAllDetail").then((result) =>{
    this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData
    console.log(this.resposeData);

    let detailData=this.resposeData.detailData;
    let photoData=this.resposeData.photoData;
    let check_result=[];
    console.log(detailData);
      Object.keys(detailData).forEach(function(key) {
       
          if(detailData[key]=="")
          {
            let sre=key_name.filter((item) => {
              return (item.id==key)
            
            })
            
            check_result.push(sre[0].name);

          }
  
          
      
    });

   


    Object.keys(photoData).forEach(function(key) {
       
      if(photoData[key]=="")
      {
        let sre=key_name.filter((item) => {
          return (item.id==key)
        
        })

        check_result.push(sre[0].name);
      }

      
  
});

      this.check_result=check_result
    //console.log(this.check_result);



    }, (err) => {

    });

}


confirmUpdate()
{
  
  let alert = this.alerCtrl.create({
    title: 'ยืนยันส่งข้อมูล',
    message: 'กรุณาส่งข้อมูลให้มากที่สุด เพราะว่าจะไม่สามารถกลับมาแก้ไขได้อีก',
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
        let postDat ={app_id:this.app_id,checker_id:this.checker_id};
            console.log(postDat);

    this.authService.postData(postDat, "/applyApi/appupdateStatus").then((result) =>{
      this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData
      console.log(result);

      if(this.resposeData.res=='success')
      {

         // this.navCtrl.pop();
            this.dismissAndExit();

      }

     

      }, (err) => {


      });


 
        }
      }
    ]
  });
   alert.present();
}



 

}