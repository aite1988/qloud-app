import { Platform, NavController, AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfirmExit {
    //navCtrl:NavController;
 // constructor(public http: HttpClient) {
  constructor(public platform:Platform,public alertCtrl:AlertController) {

  }


disable(){
    this.platform.registerBackButtonAction(() => {
  
    //this.navCtrl.pop(); 
    
  }, 0)
  }
  
  enable(){
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

   
}


