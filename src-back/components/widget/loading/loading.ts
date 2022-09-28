import { Component, Input } from '@angular/core';
import {  ViewChild} from '@angular/core';
import { NavController ,Slides} from 'ionic-angular';

/**
 * Generated class for the IconWidgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'loading-widget',
  templateUrl: 'loading.html',
})
export class LoadingWidget {

  @Input() public background: string; // this is typed as string, but you can use any type you want
  @Input() public timer:any; // this is typed as string, but you can use any type you want
  @Input() public top:any; // this is typed as string, but you can use any type you want
  @Input() public size:any; // this is typed as string, but you can use any type you want
  @Input() public heigth:any; // this is typed as string, but you can use any type you want
  

  initLoading=true;
  constructor() {
    setTimeout(()=>{
      this.val();
  
       },10);

  }

  ngOnInit()
  {

  }

  val()
  {
  
    setTimeout(()=>{
      this.initLoading=false;
  
       },this.timer);
       this.initLoading=true;
    //console.log(this.initLoading);
  }

  padding()
  {
    return {"padding-top":this.top};
  }

  backgroundColor()
  {
    return {"background-color":this.background,"height":this.heigth,"touch-action":"none"};
  }

  sizeLoading()
  {
    return {"width":this.size+"px"};
  }

}
