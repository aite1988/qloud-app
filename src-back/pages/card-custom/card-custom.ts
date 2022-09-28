import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,Content} from 'ionic-angular';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

/**
 * Generated class for the CardCustomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card-custom',
  templateUrl: 'card-custom.html',
})

export class CardCustomPage {
  @ViewChild(Content) container: Content;
contentLoaded: Subject<any> = new Subject();
loadAndScroll: Observable<any>;
resposeData:any;
getDat:any=[];
  lazyLoadImage = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public authService:ApiServiceProvider) {
      this.getData();
  }
  ionViewDidEnter() {
 
    this.container.scrollTo(this.container.scrollLeft, this.container.scrollTop + 1);
    this.container.scrollTo(this.container.scrollLeft, this.container.scrollTop - 1);
}
ionViewDidLoad() {

    this.loadAndScroll = Observable.merge(

      this.container.ionScroll,
      this.contentLoaded
   );

}


getData()
{
  this.authService.postDataFoodmee("","/getResAll").then((result) =>{
    this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData

   this.getDat=this.resposeData.resDat;
    console.log(this.getDat);

    this.getDat.forEach(element => {
  element.cover_photo="JSON.stringify(element.goole_photo);";
if(element.google_photo)
{
  element.cover_photo="https://www.taxi-delivery.com/api-foodmee/"+JSON.parse(element.google_photo)[0];
}
  
      
    });
    }, (err) => {

    });
    //console.log(this.getDat);
}

}
