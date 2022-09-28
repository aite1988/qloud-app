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
  selector: 'img-lazy',
  templateUrl: 'img-lazy.html',
})

export class ImgLazyWidget {

  @Input() public src: string; // this is typed as string, but you can use any type you want
  @Input() public width:any; // this is typed as string, but you can use any type you want
  @Input() public heigth:any; // this is typed as string, but you can use any type you want
  loaded=false;
  constructor() {
    setTimeout(()=>{
      this.val();
  
       },10);

  }

  sizeImg()
  {
    if(this.loaded)
    {
      
      return {"width":this.width,"height":this.heigth};
    }
    else
    {
      return {visibility:'hidden'};
    }
   
  }
  sizeLoading()
  {
    return {"width":this.width,"height":this.heigth};
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
   console.log("loaded");

  }

}
