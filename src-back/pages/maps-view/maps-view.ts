import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the MapsViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maps-view',
  templateUrl: 'maps-view.html',
})
export class MapsViewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapsViewPage');
    const browser = this.iab.create('https://maps.google.com','',{location:'yes', zoom:'no',footer:'yes',hideurlbar:'yes'}); 
    browser.show();
  }

}
