import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
input={name:"",surname:"",id_card:"",username:"",password:"",con_password:"",tel:"",accept:false};
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public alerCtrl:AlertController
    ,public authService:ApiServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  submit()
  {
    if(this.input.name&&this.input.surname&&this.input.id_card&&this.input.tel&&this.input.username&&this.input.password&&this.input.con_password)
{


    if(this.input.con_password!=this.input.password)
    {
      let alert = this.alerCtrl.create({
        title: 'พบข้อผิดพลาด',
        message: 'รหัสผ่านไม่ตรงกัน',
        buttons: ['Ok']
      });
      alert.present();

    }
    else if(this.input.accept==false)
    {
      let alert = this.alerCtrl.create({
        title: 'พบข้อผิดพลาด',
        message: 'กรุณากดยอมรับ',
        buttons: ['Ok']
      });
      alert.present();

    }
    else
    {
      this.authService.postData(this.input, "/checkerApi/checkerRegister").then((result) =>{
   
        console.log(result)
        let alert = this.alerCtrl.create({
          title: 'ขอบคุณที่ลงทะเบียน',
          message: 'กรุณากดเข้าสู่ระบบ',
          buttons: ['Ok']
        });
        alert.present();
        this.navCtrl.setRoot(LoginPage);
      
        
   
        }, (err) => {
         // this.presentToast(err); // ถ้าเกิดข้อผิดพลาดให้แสดงข้อความ
        });


    }

  }
  else
  {
    let alert = this.alerCtrl.create({
      title: 'พบข้อผิดพลาด',
      message: 'กรุณากรอกข้อมูลให้ครบ',
      buttons: ['Ok']
    });
    alert.present();


  }
  }

}
