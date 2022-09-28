import { Component, Input, NgModule } from '@angular/core';
import {  ViewChild} from '@angular/core';
import { NavController ,Slides} from 'ionic-angular';

/**
 * Generated class for the IconWidgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'img-lazy-circle',
  templateUrl: 'img-lazy-circle.html',
})

export class ImgLazyCircleWidget {

  @Input() public src: string; // this is typed as string, but you can use any type you want
  loaded=false;
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

  }
  onloading(evt)
  {
    this.loaded=true;
   // console.log(evt);

  }

  sizeImg()
  {
    if(this.loaded)
    {
      
      return {};
    }
    else
    {
      return {visibility:'hidden'};
    }
   
  }
  sizeLoading()
  {
    return {};
  }


}
