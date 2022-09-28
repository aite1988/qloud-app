import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {ConfirmExit} from '../../providers/confirm-exit'

/**
 * Generated class for the MessageReadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-read',
  templateUrl: 'message-read.html',
})
export class MessageReadPage {
  message:any;
  header:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public confirmExit:ConfirmExit
    ,public platform:Platform) {
    this.header=navParams.get('header');
    this.message=navParams.get('message');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageReadPage');
  }
  ionViewWillEnter()
  {
    this.platform.registerBackButtonAction(() => {
  
      this.navCtrl.pop(); 
      
    }, 0)
    
  }
  ionViewWillLeave()
  {
    this.confirmExit.enable();
  }

  

}
