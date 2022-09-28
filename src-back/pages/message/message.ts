import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  resposeData:any;
  con_id:any;
  messageDat:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public authService:ApiServiceProvider) {
      this.con_id=localStorage.getItem("con-id");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }
  ionViewWillEnter()
  {
    this.messageList();
  }

  messageList()
  {
    let postDat={con_id:this.con_id}
    this.authService.postData(postDat, "taxiMessageList").then((result) =>{
      this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData
      this.messageDat=this.resposeData.messageDat;
      console.log(this.resposeData);
      }, (err) => {

      });
  }

  messageDelete(id)
  {
    let postDat={con_id:this.con_id,id:id};
    console.log(postDat);
    this.authService.postData(postDat, "taxiMessageDelete").then((result) =>{
      this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData
      this.messageList();
      console.log(result);
      }, (err) => {

      });
  }
  call(tel)
  {



     // console.log(tel[1]);
      window.open('tel:'+tel);

  }

  direction(lat_long)
  {


    let mapsDirection="https://www.google.com/maps/dir//"+lat_long+"/@"+lat_long+",13z?hl=en-US";
     // console.log(tel[1]);
      window.open(mapsDirection);

  }

  gotoRead(header,message)
  {
    this.navCtrl.push("MessageReadPage",{header:header,message:message});
  }

}
